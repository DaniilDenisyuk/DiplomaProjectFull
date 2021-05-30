import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "Users";
const defaultFields = [
  "id",
  "email",
  "username",
  "first_name",
  "last_name",
  "phone",
  "password",
  "role",
];

const getUserByLogin = async (login) => {
  const sql = `SELECT ${defaultFields.join(
    ", "
  )} FROM ${defaultTable} WHERE email=$1 OR username=$1`;
  const res = await db.query(sql, [login]);
  return res.rows[0];
};

const getUser = async (userId) => {
  const { sql, args } = queryBuilder.select(defaultTable, defaultFields, {
    id: userId,
  });
  const res = await db.query(sql, args);
  return res.rows[0];
};

const getAllUsers = async () => {
  const { sql, args } = queryBuilder.select(defaultTable, defaultFields);
  const res = await db.query(sql, args);
  return res.rows;
};

const createUser = async (fields) => {
  const { sql, args } = queryBuilder.insert(defaultTable, fields);
  const res = await db.query(sql, args);
  return true;
};

const updateUser = async (userId, user) => {
  const { sql, args } = queryBuilder.update(
    defaultTable,
    user,
    { id: userId },
    ["id"]
  );
  const res = await db.query(sql, args);
  return true;
};

const updateUserAddress = async (userId, fields) => {
  const { sql, args } = queryBuilder.update("user_address", fields, {
    id: userId,
  });
  const res = await db.query(sql, args);
  return true;
};

const deleteUser = async (userId) => {
  const { sql, args } = queryBuilder.delete(defaultTable, { id: userId }, [
    "id",
  ]);
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const getUserFavorites = async (userId) => {
  const { sql, args } = queryBuilder.select("user_item", ["item_id"], {
    user_id: userId,
  });
  const res = await db.query(sql, args);
  return res.rows;
};

const addItemToUserFavorites = async (userId, itemId) => {
  const { sql, args } = queryBuilder.insert("user_item", {
    user_id: userId,
    item_id: itemId,
  });
  const res = await db.query(sql, args);
  return true;
};

const removeItemFromUserFavorites = async (userId, itemId) => {
  const { sql, args } = queryBuilder.delete("user_item", {
    user_id: userId,
    item_id: itemId,
  });
  const res = await db.query(sql, args);
  return true;
};

export const usersService = {
  getUserByLogin,
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserFavorites,
  addItemToUserFavorites,
  removeItemFromUserFavorites,
};

export default usersService;
