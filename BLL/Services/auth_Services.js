const authRepository = require("../../DAL/auth_Repository");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const sendEmail = require("../../utils/sendEmail");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
  return passwordRegex.test(password);
}

async function register(name, email, password, adminCode) {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    );
  }

  const existingUser = await authRepository.getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let role = "user";
  if (adminCode && adminCode === process.env.ADMIN_SECRET_CODE) {
    role = "admin";
  }

  await authRepository.createUser(name, email, hashedPassword, role);

  return {
    message: "User registered successfully",
    role,
  };
}

async function login(email, password) {
  if (!email || !password) {
    return null;
  }

  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
}
async function forgotPassword(email) {
  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("Email not found");
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await authRepository.saveOtp(email, otp, expiresAt);

  await sendEmail(
    email,
    "Password Reset OTP",
    `Your OTP code is: ${otp}. It expires in 10 minutes.`
  );

  return { message: "OTP sent to your email" };
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/;
  return passwordRegex.test(password);
}

async function resetPassword(email, otp, newPassword, adminCode) {
  if (!email || !otp || !newPassword) {
    throw new Error("All fields are required");
  }

  // ✅ password validation
  if (!isValidPassword(newPassword)) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    );
  }

  const user = await authRepository.verifyOtp(email, otp);

  if (!user) {
    throw new Error("Invalid or expired OTP");
  }

  // 🔥 ADMIN CODE VALIDATION
  if (user.role === "admin") {
    if (!adminCode || adminCode !== process.env.ADMIN_SECRET_CODE) {
      throw new Error("Invalid admin code");
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await authRepository.updatePasswordByEmail(email, hashedPassword);

  return { message: "Password reset successful" };
}
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};