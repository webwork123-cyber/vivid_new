const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth_Controller");
const authMiddleware = require("../../middleware/middleware");
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/dashboard", authMiddleware, authController.getDashboard);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.get("/forgot-password", authController.getForgotPassword);
router.post("/forgot-password", authController.postForgotPassword);

router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

router.get("/logout", authController.logout);

module.exports = router;