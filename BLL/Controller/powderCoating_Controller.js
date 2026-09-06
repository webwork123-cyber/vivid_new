const powderServices = require("../Services/powderCoating_Services");

async function addPowderCoating(req, res) {
  try {
    const { category, name, description, video } = req.body;

    const photo = req.files.photo
      ? "/uploads/" + req.files.photo[0].filename
      : null;

    await powderServices.addPowderCoating(
      category,
      name,
      description,
      photo,
      video
    );

    res.redirect("/admin/dashboard?tab=powder");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=powder");
  }
}

async function updatePowderCoating(req, res) {
  try {
    const { id } = req.params;
    const { category, name, description, video } = req.body;

    const existing = await powderServices.getPowderCoatingById(id);

    if (!existing) {
      return res.redirect("/admin/dashboard?tab=powder");
    }

    let photo = existing.photo;

    if (req.files.photo) {
      photo = "/uploads/" + req.files.photo[0].filename;
    }

    await powderServices.updatePowderCoating(
      id,
      category,
      name,
      description,
      photo,
      video
    );

    res.redirect("/admin/dashboard?tab=powder");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=powder");
  }
}

async function deletePowderCoating(req, res) {
  try {
    const { id } = req.params;

    await powderServices.deletePowderCoating(id);

    res.redirect("/admin/dashboard?tab=powder");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=powder");
  }
}
const categoryMap = {
  "manual-powder-coating": "Manual Powder Coating",
  "automatic-powder-coating": "Automatic Powder Coating",
  "cub-powder-coating-system": "CUB Powder Coating System"
};

async function getPowderCoatingByCategory(req, res) {
  try{
    const category=categoryMap[req.params.category];
    if(!category){
      return res.status(404).send("Category not found");
    }
    const categories=await powderServices.getPowderCoatingByCategory(category);
    res.render("powderCoatingCategory", { categories, category });
  }catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = {
  addPowderCoating,
  updatePowderCoating,
  deletePowderCoating,
  getPowderCoatingByCategory
};