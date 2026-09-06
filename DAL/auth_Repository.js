const db = require("./Database");

async function createUser(name, email, password, role) {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [name, email, password, role]);
  return result;
}

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows[0];
}

async function saveOtp(email, otp, expiresAt) {
  const query = `
    UPDATE users
    SET reset_otp = ?, reset_otp_expires = ?
    WHERE email = ?
  `;
  const [result] = await db.execute(query, [otp, expiresAt, email]);
  return result;
}

async function updatePasswordByEmail(email, hashedPassword) {
  const query = `
    UPDATE users
    SET password = ?, reset_otp = NULL, reset_otp_expires = NULL
    WHERE email = ?
  `;
  const [result] = await db.execute(query, [hashedPassword, email]);
  return result;
}

async function verifyOtp(email, otp) {
  const query = `
    SELECT * FROM users
    WHERE email = ?
      AND reset_otp = ?
      AND reset_otp_expires > NOW()
  `;
  const [rows] = await db.execute(query, [email, otp]);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail,
  saveOtp,
  updatePasswordByEmail,
  verifyOtp,
};