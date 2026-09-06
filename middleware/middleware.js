const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/admin/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔴 Check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).send("Access denied. Admins only.");
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/admin/login");
  }
}

module.exports = adminMiddleware;