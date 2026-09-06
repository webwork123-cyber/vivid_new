const powderRepository = require("../../DAL/powderCoating_Repository");

async function addPowderCoating(category, name, description, photo, video) {
  if (!category || !name || !description) {
    throw new Error("Category, name, and description are required");
  }

  return await powderRepository.createPowderCoating(
    category,
    name,
    description,
    photo,
    video
  );
}

async function getAllPowderCoating() {
  return await powderRepository.getAllPowderCoating();
}

async function getPowderCoatingById(id) {
  if (!id) throw new Error("ID is required");

  return await powderRepository.getPowderCoatingById(id);
}

async function updatePowderCoating(id, category, name, description, photo, video) {
  if (!id) throw new Error("ID is required");

  if (!category || !name || !description) {
    throw new Error("Category, name, and description are required");
  }

  const existing = await powderRepository.getPowderCoatingById(id);

  if (!existing) {
    throw new Error("Powder coating item not found");
  }

  const updatedPhoto = photo || existing.photo;
  const updatedVideo = video || existing.video;

  return await powderRepository.updatePowderCoating(
    id,
    category,
    name,
    description,
    updatedPhoto,
    updatedVideo
  );
}

async function deletePowderCoating(id) {
  if (!id) throw new Error("ID is required");

  const existing = await powderRepository.getPowderCoatingById(id);

  if (!existing) {
    throw new Error("Powder coating item not found");
  }

  return await powderRepository.deletePowderCoating(id);
}
async function getPowderCoatingByCategory(category) {
  if (!category) throw new Error("Category is required");
  return await powderRepository.getPowderCoatingByCategory(category);
}
module.exports = {
  addPowderCoating,
  getAllPowderCoating,
  getPowderCoatingById,
  updatePowderCoating,
  deletePowderCoating,
  getPowderCoatingByCategory
};