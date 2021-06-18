import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "orders";
const defaultFields = [
  "id",
  "user_id",
  "customer_name",
  "customer_phone",
  "order_date",
  "order_price",
  "status",
];

const getPendingOrders = async () => {
  const sql = `select ${defaultFields.map((field) => `o.${field}`)},
    array_agg(array[mi.id::varchar, mi.name, mi.price::varchar, ii.img]) as items
    from orders as o
    left join order_item as oi on oi.order_id = o.id
    left join menuitems as mi on mi.id = oi.item_id
    left join item_image as ii on (ii.item_id = mi.id
    and ii.img_order IN (0, 1))
    where o.status = 'pending'
    group by o.id
    order by o.order_date`;
  const res = await db.query(sql);
  return res.rows.map((row) => {
    row.items = row.items.map((item) => ({
      id: item[0],
      name: item[1],
      price: item[2],
      img: item[3],
    }));
    return row;
  });
};

const getAllOrders = async () => {
  const sql = `select ${defaultFields.map((field) => `o.${field}`)},
    array_agg(array[mi.id::varchar, mi.name, mi.price::varchar, ii.img]) as items
    from orders as o
    left join order_item as oi on oi.order_id = o.id
    join menuitems as mi on mi.id = oi.item_id
    join item_image as ii on (ii.item_id = mi.id
    and ii.img_order IN (0, 1))
    group by o.id
    order by o.order_date`;
  const res = await db.query(sql);
  return res.rows.map((row) => {
    row.items = row.items.map((item) => ({
      id: item[0],
      name: item[1],
      price: item[2],
      img: item[3],
    }));
    return row;
  });
};

const createOrder = async (fields, items) => {
  const { sql, args } = queryBuilder.insert(defaultTable, fields, ["id"]);
  const values = items.map(
    ({ id, count }) => `((select id from inserted), ${id}, ${count})`
  );
  const sql2 = `Insert into order_item (order_id, item_id, item_count) values ${values.join(
    ", "
  )} returning (select id from inserted)`;
  const finalSql = `with inserted as (${sql}) ${sql2};`;
  const res = await db.query(finalSql, args);
  return res.rows[0];
};

const updateOrderStatus = async (id, status) => {
  const { sql, args } = queryBuilder.update(defaultTable, { status }, { id });
  const res = await db.query(sql, args);
  return true;
};

const getUserOrders = async (userId) => {
  const sql = `select ${defaultFields.map((field) => `o.${field}`)},
    array_agg(array[mi.id::varchar, mi.name, mi.price::varchar, ii.img, oi.item_count::varchar]) as items
    from orders as o
    left join order_item as oi on oi.order_id = o.id
    join menuitems as mi on mi.id = oi.item_id
    join item_image as ii on (ii.item_id = mi.id
    and ii.img_order IN (0, 1))
    where o.user_id = ${userId}
    group by o.id
    order by o.order_date`;
  const res = await db.query(sql);
  return res.rows.map((row) => {
    row.items = row.items.map((item) => ({
      id: item[0],
      name: item[1],
      price: item[2],
      img: item[3],
      count: item[4],
    }));
    return row;
  });
};

export const ordersService = {
  getPendingOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
  getUserOrders,
};

export default ordersService;
