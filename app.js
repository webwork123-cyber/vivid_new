const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv=require("dotenv");
const authRoutes = require("./BLL/Routes/auth_Routes");
const industrialRoutes = require("./BLL/Routes/industrial_Routes");
const laboratoryRoutes = require("./BLL/Routes/laboratorySupplies_Routes");
const powderRoutes = require("./BLL/Routes/powderCoating_Routes");

dotenv.config();
const app = express();
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "PL/views"));
app.use(express.static(path.join(__dirname, "PL/public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images",express.static(path.join(__dirname,"images")));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/admin", authRoutes);
app.use("/industrial", industrialRoutes);
app.use("/laboratory", laboratoryRoutes);
app.use("/powder", powderRoutes);
app.get("/maintenance", (req, res) => {
  res.render("maintenance");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;