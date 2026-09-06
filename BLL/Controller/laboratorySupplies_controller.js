const laboratoryServices = require("../Services/laboratorySupplies_Services");

async function addLaboratorySupply(req, res) {
  try {
    const { category, name, description } = req.body;

    const photo = req.files.photo
      ? "/uploads/" + req.files.photo[0].filename
      : null;

    const pdf = req.files.pdf
      ? "/uploads/" + req.files.pdf[0].filename
      : null;

    await laboratoryServices.addLaboratorySupply(
      category,
      name,
      description,
      photo,
      pdf
    );

res.redirect("/admin/dashboard?tab=laboratory");
  } catch (error) {
    console.error(error);
res.redirect("/admin/dashboard?tab=laboratory");
  }
}

async function updateLaboratorySupply(req, res) {
  try {
    const { id } = req.params;
    const { category, name, description } = req.body;

    const existing = await laboratoryServices.getLaboratorySupplyById(id);

    if (!existing) {
      return res.redirect("/admin/dashboard?tab=laboratory");
    }

    let photo = existing.photo;
    let pdf = existing.pdf;

    if (req.files.photo) {
      photo = "/uploads/" + req.files.photo[0].filename;
    }

    if (req.files.pdf) {
      pdf = "/uploads/" + req.files.pdf[0].filename;
    }

    await laboratoryServices.updateLaboratorySupply(
      id,
      category,
      name,
      description,
      photo,
      pdf
    );

   res.redirect("/admin/dashboard?tab=laboratory");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=laboratory");
  }
}

async function deleteLaboratorySupply(req, res) {
  try {
    const { id } = req.params;

    await laboratoryServices.deleteLaboratorySupply(id);

    res.redirect("/admin/dashboard?tab=laboratory");
  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard?tab=laboratory");
  }
}
const categoryMap = {
  "chromatography-products": "Chromatography Laboratory Products",
  "laboratory-filtration": "Laboratory Filtration",
  "laboratory-instruments": "Laboratory Instruments",
  "hplc-system": "HPLC System",
  "pharmaceutical-testing-instruments": "Pharmaceutical Testing Instruments",
  "vacuum-pumps": "Vacuum Pumps"
}
async function getLaboratorySuppliesByCategory(req, res) {
  try {
    const category=categoryMap[req.params.category]
    const categories=await laboratoryServices.getLaboratorySuppliesByCategory(category)
    res.render("Laboratory_Categories",{category,categories});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");

  }
}
module.exports = {
  addLaboratorySupply,
  updateLaboratorySupply,
  deleteLaboratorySupply,
  getLaboratorySuppliesByCategory
};