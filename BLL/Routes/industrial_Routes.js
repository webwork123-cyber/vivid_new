const express = require("express");

const router = express.Router();

const industrialController = require("../Controller/industrial_Controller");

const authMiddleware = require("../../middleware/middleware");

const upload = require("../../utils/uploads");

/* CREATE */
router.post(
  "/add",
  authMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  industrialController.addIndustrialCategory
);

/* UPDATE */
router.post(
  "/edit/:id",
  authMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  industrialController.updateIndustrialCategory
);

/* DELETE */
router.post(
  "/delete/:id",
  authMiddleware,
  industrialController.deleteIndustrialCategory
);
router.get("/", (req,res)=>{
  res.render("industrial");
});
router.get("/:category",industrialController.getIndustrialCategoriesByCategory);
module.exports = router;