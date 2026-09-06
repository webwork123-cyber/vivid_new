const express = require("express");
const router = express.Router();

const powderController = require("../Controller/powderCoating_controller");
const authMiddleware = require("../../middleware/middleware");
const upload = require("../../utils/uploads");

router.post(
  "/add",
  authMiddleware,
  upload.fields([{ name: "photo", maxCount: 1 }]),
  powderController.addPowderCoating
);

router.post(
  "/edit/:id",
  authMiddleware,
  upload.fields([{ name: "photo", maxCount: 1 }]),
  powderController.updatePowderCoating
);

router.post(
  "/delete/:id",
  authMiddleware,
  powderController.deletePowderCoating
);
router.get("/",(req,res)=>{
  res.render("Powder");
});
router.get("/:category",powderController.getPowderCoatingByCategory);

module.exports = router;