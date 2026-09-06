const express = require("express");
const router = express.Router();

const laboratoryController = require("../Controller/laboratorySupplies_Controller");
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
  laboratoryController.addLaboratorySupply
);

/* UPDATE */
router.post(
  "/edit/:id",
  authMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  laboratoryController.updateLaboratorySupply
);

/* DELETE */
router.post(
  "/delete/:id",
  authMiddleware,
  laboratoryController.deleteLaboratorySupply
);
router.get("/",(req,res)=>{
  res.render("Laboratory");
})
router.get("/:category",laboratoryController.getLaboratorySuppliesByCategory)
module.exports = router;