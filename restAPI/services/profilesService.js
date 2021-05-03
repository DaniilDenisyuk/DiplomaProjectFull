import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "Profiles";
const defaultFields = ["id", "name", "gender", "birthdate", "city"];

const getProfile = async (profileId) => {
  const { sql, args } = queryBuilder.select(defaultTable, defaultFields, {
    id: profileId,
  });
  const res = await db.query(sql, args);
  return res.rows[0];
};

const getAllUserProfiles = async (userId) => {
  const { sql, args } = queryBuilder.select(defaultTable, defaultFields, {
    user_id: userId,
  });
  const res = await db.query(sql, args);
  return res.rows;
};

const createProfile = async (profile) => {
  const { sql, args } = queryBuilder.insert(defaultTable, profile, ["id"]);
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const updateProfile = async (profileId, profile) => {
  const { sql, args } = queryBuilder.update(
    defaultTable,
    profile,
    { id: profileId },
    ["id"]
  );
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const deleteProfile = async (profileId) => {
  const { sql, args } = queryBuilder.delete(defaultTable, { id: profileId }, [
    "id",
  ]);
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

export const profilesService = {
  getProfile,
  getAllUserProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
