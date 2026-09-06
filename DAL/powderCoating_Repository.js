const db = require("./Database");

async function createPowderCoating(category, name, description, photo, video) {
  const query = `
    INSERT INTO powder_coating
    (category, name, description, photo, video)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    category,
    name,
    description,
    photo,
    video
  ]);

  return result;
}

async function getAllPowderCoating() {
  const query = `
    SELECT *
    FROM powder_coating
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query);
  return rows;
}

async function getPowderCoatingById(id) {
  const query = `
    SELECT *
    FROM powder_coating
    WHERE id = ?
  `;

  const [rows] = await db.execute(query, [id]);
  return rows[0];
}

async function updatePowderCoating(id, category, name, description, photo, video) {
  const query = `
    UPDATE powder_coating
    SET
      category = ?,
      name = ?,
      description = ?,
      photo = ?,
      video = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
    category,
    name,
    description,
    photo,
    video,
    id
  ]);

  return result;
}

async function deletePowderCoating(id) {
  const query = `
    DELETE FROM powder_coating
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);
  return result;
}
async function getPowderCoatingByCategory(category) {
  const query=`select * from powder_coating where category=?`;
  const [rows]=await db.execute(query,[category]);
  return rows;
}
module.exports = {
  createPowderCoating,
  getAllPowderCoating,
  getPowderCoatingById,
  updatePowderCoating,
  deletePowderCoating,
  getPowderCoatingByCategory
};