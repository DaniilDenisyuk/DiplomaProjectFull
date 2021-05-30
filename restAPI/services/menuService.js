import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "menuitems";
const defaultFields = [
  "id",
  "name",
  "category",
  "volume",
  "energy",
  "weight",
  "description",
  "price",
  "imgs",
];

const getMenuAvailable = async () => {
  const sql = `select ${defaultFields.toString()} from getMenu()`;
  const res = await db.query(sql);
  return res.rows;
};

const addItem = async (fields) => {
  const { sql, args } = queryBuilder.insert(defaultTable, fields);
  const res = await db.query(sql, args);
  return true;
};

const updateItem = async (itemId, fields) => {
  const { sql, args } = queryBuilder.update(defaultTable, fields, {
    id: itemId,
  });
  const res = await db.query(sql, args);
  return true;
};

const removeItem = async (itemId) => {
  const { sql, args } = queryBuilder.delete(defaultTable, { id: itemId });
  const res = await db.query(sql, args);
  return true;
};

export const menuService = {
  getMenuAvailable,
  addItem,
  updateItem,
  removeItem,
};

export default menuService;
