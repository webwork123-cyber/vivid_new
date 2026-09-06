const laboratoryRepository = require("../../DAL/laboratorySupplies_Repository");

async function addLaboratorySupply(category, name, description, photo, pdf) {
  if (!category || !name || !description ) {
    throw new Error("All fields are required");
  }

  return await laboratoryRepository.createLaboratorySupply(
    category,
    name,
    description,
    photo,
    pdf
  );
}

async function getAllLaboratorySupplies() {
  return await laboratoryRepository.getAllLaboratorySupplies();
}

async function getLaboratorySupplyById(id) {
  if (!id) throw new Error("ID is required");

  return await laboratoryRepository.getLaboratorySupplyById(id);
}

async function updateLaboratorySupply(id, category, name, description, photo, pdf) {
  if (!id) throw new Error("ID is required");

  if (!category || !name || !description) {
    throw new Error("Required fields missing");
  }

  const existing = await laboratoryRepository.getLaboratorySupplyById(id);

  if (!existing) {
    throw new Error("Laboratory supply not found");
  }

  const updatedPhoto = photo || existing.photo;
  const updatedPdf = pdf || existing.pdf;

  return await laboratoryRepository.updateLaboratorySupply(
    id,
    category,
    name,
    description,
    updatedPhoto,
    updatedPdf
  );
}

async function deleteLaboratorySupply(id) {
  if (!id) throw new Error("ID is required");

  const existing = await laboratoryRepository.getLaboratorySupplyById(id);

  if (!existing) {
    throw new Error("Laboratory supply not found");
  }

  return await laboratoryRepository.deleteLaboratorySupply(id);
}
async function getLaboratorySuppliesByCategory(category) {
  if (!category) {
    throw new Error("Category is required");
  }

  return await laboratoryRepository.getLaboratorySuppliesByCategory(category);
}

module.exports = {
  addLaboratorySupply,
  getAllLaboratorySupplies,
  getLaboratorySupplyById,
  updateLaboratorySupply,
  deleteLaboratorySupply,
  getLaboratorySuppliesByCategory
};