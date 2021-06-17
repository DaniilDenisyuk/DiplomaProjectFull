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

const getTopItemsFromEachCategory = async (itemsPerCategory) => {
  const sql = `select ranked_scores.* from
    (SELECT score_data.*,
      row_number() OVER (PARTITION BY category ORDER BY orders_count DESC)
      FROM score_data) ranked_scores
      where row_number <= ${itemsPerCategory}`;
  const res = await db.query(sql);
  return res.rows;
};

const addItem = async (fields, images) => {
  let { sql, args } = queryBuilder.insert(defaultTable, fields, ["id"]);
  if (images && images.length > 0) {
    const values = images.map(
      (image, index) =>
        `((select id from inserted), ${image.img}, ${
          isNaN(image.order) ? index : image.order
        })`
    );
    const sql2 = `Insert into item_image (item_id, img, order) values ${values.join(
      ", "
    )}`;
    sql = `with inserted as (${sql}) ${sql2};`;
  }

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

export const menuService = {
  getTopItemsFromEachCategory,
  getMenuAvailable,
  getUserFavorites,
  removeItemFromUserFavorites,
  addItemToUserFavorites,
  addItem,
  updateItem,
  removeItem,
};

export default menuService;
