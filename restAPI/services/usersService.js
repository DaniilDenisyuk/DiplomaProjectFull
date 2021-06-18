import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
import ordersService from "./ordersService.js";
import menuService from "./menuService.js";

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
  "city",
  "street",
  "house",
  "door",
];

const getUserInfoByLogin = async (login) => {
  const sql = `SELECT ${defaultFields.join(
    ", "
  )} FROM ${defaultTable} WHERE email=$1 OR username=$1 OR phone=$1`;
  const res = await db.query(sql, [login]);
  return res.rows[0];
};

const getUserInfoById = async (userId) => {
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

const updateUserInfo = async (userId, user) => {
  const { sql, args } = queryBuilder.update(defaultTable, user, { id: userId });
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

const getAllUserData = async (userId) => {
  let info = getUserInfoById(userId);
  let orders = ordersService.getUserOrders(userId);
  let favorites = menuService.getUserFavorites(userId);
  return {
    info: await info,
    orders: await orders,
    favorites: await favorites,
  };
};

export const usersService = {
  getAllUserData,
  getUserInfoByLogin,
  getUserInfoById,
  getAllUsers,
  createUser,
  updateUserInfo,
  deleteUser,
};

export default usersService;
