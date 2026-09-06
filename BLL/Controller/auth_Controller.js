const authServices = require("../Services/auth_Services");
const jwt = require("jsonwebtoken");
const industrialServices = require("../Services/industrial_Services");
const laboratoryServices = require("../Services/laboratorySupplies_Services");
const powderServices = require("../Services/powderCoating_Services");
async function getLogin(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "admin") {
        return res.redirect("/admin/dashboard");
      }

      return res.redirect("/admin/dashboard");
    }

    return res.render("Login_Page", {
      error: null,
      message: null
    });
  } catch (error) {
    return res.render("Login_Page", {
      error: null,
      message: null
    });
  }
}

async function postLogin(req, res) {
  try {
    // 1) if cookie already exists, redirect immediately
    const token = req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === "admin") {
          return res.redirect("/admin/dashboard");
        }

        return res.redirect("/admin/dashboard");
      } catch (err) {
        return res.render("Login_Page", {
          error: "Invalid token. Please log in again.",
          message: null
        });
      }
    }

    // 2) normal login
    const { email, password } = req.body;

    const user = await authServices.login(email, password);

    if (!user) {
      return res.render("Login_Page", {
        error: "Invalid email or password",
        message: null
      });
    }

    const newToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    return res.redirect("/admin/login");

  } catch (error) {
    console.error("Error during login:", error);
    return res.render("Login_Page", {
      error: "Something went wrong. Try again.",
      message: null
    });
  }
}
async function getRegister(req, res) {
 res.render("Register_Page", { error: null });
}

async function postRegister(req, res) {
  try {
    const { name, email, password, admin_code } = req.body;

    await authServices.register(name, email, password, admin_code);

    res.render("Login_Page", {
      error: null,
      message: "Admin registration successful. Please log in.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.render("Register_Page", {
  error: error.message || "Registration failed"
});
  }
}
async function getForgotPassword(req, res) {
  res.render("ForgotPassword_Page", { error: null, message: null });
}

async function postForgotPassword(req, res) {
  try {
    const { email } = req.body;

    await authServices.forgotPassword(email);

    res.render("ResetPassword_Page", {
      error: null,
      message: "OTP sent to your email",
      email,
    });
  } catch (error) {
    res.render("ForgotPassword_Page", {
      error: error.message || "Something went wrong",
      message: null,
    });
  }
}

async function getResetPassword(req, res) {
  res.render("ResetPassword_Page", {
    error: null,
    message: null,
    email: "",
  });
}

async function postResetPassword(req, res) {
  const { email, otp, newPassword, admin_code } = req.body;

  try {
    await authServices.resetPassword(email, otp, newPassword, admin_code);

    return res.render("Login_Page", {
      error: null,
      message: "Password reset successful"
    });

  } catch (error) {
    return res.render("ResetPassword_Page", {
      error: error.message || "Something went wrong",
      message: null,
      email: email
    });
  }
}
async function getDashboard(req, res) {
  try {
    const industrial = await industrialServices.getAllIndustrialCategories();
    const laboratory = await laboratoryServices.getAllLaboratorySupplies();
    const powder = await powderServices.getAllPowderCoating();
    res.render("Dashboard_Page", {
      name: req.user.name,
      industrial,
      laboratory,
      powder,
      tab: req.query.tab,
      error: null,
      message: null
    });
  } catch (error) {
    console.error(error);

    res.render("Dashboard_Page", {
      name: req.user.name,
      items: [],
      tab: req.query.tab,
      error: "Failed to load industrial items",
      message: null
    });
  }
}
async function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/admin/login");
}

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword,
  getDashboard
};