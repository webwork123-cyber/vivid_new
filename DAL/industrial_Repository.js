const db = require("./Database");

async function createIndustrialCategory(
  category,
  name,
  description,
  photo,
  pdf
) {
  const query = `
    INSERT INTO industrial_categories
    (category, name, description, photo, pdf)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    category,
    name,
    description,
    photo,
    pdf
  ]);

  return result;
}

async function getAllIndustrialCategories() {
  const query = `
    SELECT * 
    FROM industrial_categories
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query);

  return rows;
}

async function getIndustrialCategoryById(id) {
  const query = `
    SELECT *
    FROM industrial_categories
    WHERE id = ?
  `;

  const [rows] = await db.execute(query, [id]);

  return rows[0];
}

async function getIndustrialCategoriesByCategory(category) {
  const query = `
    SELECT *
    FROM industrial_categories
    WHERE category = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query, [category]);

  return rows;
}
async function updateIndustrialCategory(
  id,
  category,
  name,
  description,
  photo,
  pdf
) {
  const query = `
    UPDATE industrial_categories
    SET
      category = ?,
      name = ?,
      description = ?,
      photo = ?,
      pdf = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
    category,
    name,
    description,
    photo,
    pdf,
    id
  ]);

  return result;
}
async function deleteIndustrialCategory(id) {
  const query = `
    DELETE FROM industrial_categories
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);

  return result;
}

module.exports = {
  createIndustrialCategory,
  getAllIndustrialCategories,
  getIndustrialCategoryById,
  getIndustrialCategoriesByCategory,
  updateIndustrialCategory,
  deleteIndustrialCategory
};