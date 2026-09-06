const industrialRepository = require("../../DAL/industrial_Repository");

async function addIndustrialCategory(
  category,
  name,
  description,
  photo,
  pdf
) {
  if (!category || !name || !description ) {
    throw new Error("All fields are required");
  }

  return await industrialRepository.createIndustrialCategory(
    category,
    name,
    description,
    photo,
    pdf
  );
}

async function getAllIndustrialCategories() {
  return await industrialRepository.getAllIndustrialCategories();
}

async function getIndustrialCategoryById(id) {
  if (!id) {
    throw new Error("ID is required");
  }

  return await industrialRepository.getIndustrialCategoryById(id);
}

async function updateIndustrialCategory(
  id,
  category,
  name,
  description,
  photo,
  pdf
) {
  if (!id) {
    throw new Error("ID is required");
  }

  if (!category || !name || !description) {
    throw new Error("Required fields missing");
  }

  const existing =
    await industrialRepository.getIndustrialCategoryById(id);

  if (!existing) {
    throw new Error("Industrial item not found");
  }

  const updatedPhoto = photo || existing.photo;
  const updatedPdf = pdf || existing.pdf;

  return await industrialRepository.updateIndustrialCategory(
    id,
    category,
    name,
    description,
    updatedPhoto,
    updatedPdf
  );
}

async function deleteIndustrialCategory(id) {
  if (!id) {
    throw new Error("ID is required");
  }

  const existing =
    await industrialRepository.getIndustrialCategoryById(id);

  if (!existing) {
    throw new Error("Industrial item not found");
  }

  return await industrialRepository.deleteIndustrialCategory(id);
}
async function getIndustrialCategoriesByCategory(category){
  if(!category){
    throw new Error("Category is required");
  }
  return await industrialRepository.getIndustrialCategoriesByCategory(category);
}
module.exports = {
  addIndustrialCategory,
  getAllIndustrialCategories,
  getIndustrialCategoryById,
  getIndustrialCategoriesByCategory,
  updateIndustrialCategory,
  deleteIndustrialCategory,
  getIndustrialCategoriesByCategory
};