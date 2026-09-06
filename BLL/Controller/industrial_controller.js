const industrialServices = require("../Services/industrial_Services");

async function getDashboard(req, res) {
  try {
    const items =
      await industrialServices.getAllIndustrialCategories();

    res.render("Dashboard_Page", {
      name: req.user.name,
      items,
      error: null,
      message: null
    });

  } catch (error) {
    console.error(error);

    res.render("Dashboard_Page", {
      name: req.user.name,
      items: [],
      error: "Failed to load dashboard",
      message: null
    });
  }
}

async function addIndustrialCategory(req, res) {
  try {
    const { category, name, description } = req.body;

    const photo = req.files.photo
      ? "/uploads/" +
        req.files.photo[0].filename
      : null;

    const pdf = req.files.pdf
      ? "/uploads/" +
        req.files.pdf[0].filename
      : null;

    await industrialServices.addIndustrialCategory(
      category,
      name,
      description,
      photo,
      pdf
    );

    const industrial =
      await industrialServices.getAllIndustrialCategories();

    res.render("Dashboard_Page", {
      name: req.user.name,
      industrial,
      error: null,
      message: "Industrial item added successfully"
    });

  } catch (error) {
    console.error(error);

    const industrial =
      await industrialServices.getAllIndustrialCategories();

    res.render("Dashboard_Page", {
      name: req.user.name,
      industrial,
      error: error.message || "Failed to add item",
      message: null
    });
  }
}
async function updateIndustrialCategory(req, res) {
  try {

    const { id } = req.params;

    const {
      category,
      name,
      description
    } = req.body;

    const existing =
      await industrialServices.getIndustrialCategoryById(id);

    if (!existing) {
      return res.redirect("/admin/dashboard?tab=industrial");
    }

    // KEEP OLD FILES BY DEFAULT
    let photo = existing.photo;
    let pdf = existing.pdf;

    // REPLACE ONLY IF NEW FILE EXISTS
    if (req.files.photo) {
      photo =
        "/uploads/" +
        req.files.photo[0].filename;
    }

    if (req.files.pdf) {
      pdf =
        "/uploads/" +
        req.files.pdf[0].filename;
    }

    await industrialServices.updateIndustrialCategory(
      id,
      category,
      name,
      description,
      photo,
      pdf
    );

    res.redirect("/admin/dashboard?tab=industrial");

  } catch (error) {

    console.error(error);

    res.redirect("/admin/dashboard?tab=industrial");
  }
}

async function deleteIndustrialCategory(req, res) {
  try {
    const { id } = req.params;

    await industrialServices.deleteIndustrialCategory(id);

    res.redirect("/admin/dashboard?tab=industrial");

  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=industrial");
  }
}
const categoryMap={
  "liquid-process-filtration":"Liquid Process Filtration",
  "compressed-air-systems":"Compressed Air Systems",
  "gas-generators":"Gas Generators",
  "testing-instruments":"Testing Instruments",
  "instrumentation":"Instrumentation",
  "pneumatics":"Pneumatics",
  "dust-collectors":"Dust Collectors",
  "vacuum-pumps":"Vacuum Pumps",
  "piping-systems":"Piping Systems"
}
async function getIndustrialCategoriesByCategory(req, res) {
  try{
    const category=categoryMap[req.params.category];
    if(!category){
      return res.status(404).send("Category not found");
    }
    const categories=await industrialServices.getIndustrialCategoriesByCategory(category);
    res.render("Industrial_categories",{
      category,
      categories
    });
    }catch(error){
      console.error(error);
      res.status(500).send("Failed to load categories");
    }

  }

module.exports = {
  getDashboard,
  addIndustrialCategory,
  updateIndustrialCategory,
  deleteIndustrialCategory,
  getIndustrialCategoriesByCategory
};