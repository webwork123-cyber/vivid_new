const db = require("./Database");

async function createLaboratorySupply(category, name, description, photo, pdf) {
  const query = `
    INSERT INTO laboratory_supplies
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

async function getAllLaboratorySupplies() {
  const query = `
    SELECT *
    FROM laboratory_supplies
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query);
  return rows;
}

async function getLaboratorySupplyById(id) {
  const query = `
    SELECT *
    FROM laboratory_supplies
    WHERE id = ?
  `;

  const [rows] = await db.execute(query, [id]);
  return rows[0];
}
async function getLaboratorySuppliesByCategory(category) {
  const query=`select * from laboratory_supplies where category=?`
  const [rows]=await db.execute(query,[category])
  return rows;
}
async function updateLaboratorySupply(id, category, name, description, photo, pdf) {
  const query = `
    UPDATE laboratory_supplies
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

async function deleteLaboratorySupply(id) {
  const query = `
    DELETE FROM laboratory_supplies
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);
  return result;
}

module.exports = {
  createLaboratorySupply,
  getAllLaboratorySupplies,
  getLaboratorySupplyById,
  updateLaboratorySupply,
  deleteLaboratorySupply,
  getLaboratorySuppliesByCategory
};