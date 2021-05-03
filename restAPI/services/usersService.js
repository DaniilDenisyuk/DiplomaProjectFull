import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "Users";
const defaultFields = ["id", "email", "username", "password", "role"];

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

const createUser = async (user) => {
  const { sql, args } = queryBuilder.insert(defaultTable, user, ["id"]);
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const updateUser = async (userId, user) => {
  const { sql, args } = queryBuilder.update(
    defaultTable,
    user,
    { id: userId },
    ["id"]
  );
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const deleteUser = async (userId) => {
  const { sql, args } = queryBuilder.delete(defaultTable, { id: userId }, [
    "id",
  ]);
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

export const usersService = {
  getUserByLogin,
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
