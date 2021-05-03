const OPERATORS = [">=", "<=", "<>", ">", "<"];

const where = (conditions, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(conditions);
  for (const key of keys) {
    let operator = "=";
    let value = conditions[key];
    if (typeof value === "string") {
      for (const op of OPERATORS) {
        const len = op.length;
        if (value.startsWith(op)) {
          operator = op;
          value = value.substring(len);
        }
      }
      if (value.includes("*") || value.includes("?")) {
        operator = "LIKE";
        value = value.replace(/\*/g, "%").replace(/\?/g, "_");
      }
    }
    clause.push(`${key} ${operator} $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(" AND "), args };
};

const updates = (delta, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(delta);
  for (const key of keys) {
    const value = delta[key].toString();
    clause.push(`${key} = $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(", "), args };
};

const parseFieldsParamsData = (record) => {
  const keys = Object.keys(record);
  const nums = new Array(keys.length);
  const data = new Array(keys.length);
  let i = 0;
  for (const key of keys) {
    data[i] = record[key];
    nums[i] = `$${++i}`;
  }
  const fields = keys.join(", ");
  const params = nums.join(", ");
  return { fields, params, data };
};

const insert = (table, record, returnFields = null) => {
  const keys = Object.keys(record);
  const nums = new Array(keys.length);
  const data = new Array(keys.length);
  let i = 0;
  for (const key of keys) {
    data[i] = record[key];
    nums[i] = `$${++i}`;
  }
  const fields = keys.join(", ");
  const params = nums.join(", ");
  let sql = `INSERT INTO ${table} (${fields}) VALUES (${params})`;
  if (returnFields) sql += ` RETURNING ${returnFields.join(", ")}`;
  return { sql, args: data };
};

const select = (table, fields = ["*"], conditions = null) => {
  const keys = fields.join(", ");
  let sql = `SELECT ${keys} FROM ${table}`;
  let whereClause = "";
  let args = [];
  if (conditions) {
    const whereData = where(conditions);
    whereClause = " WHERE " + whereData.clause;
    args = whereData.args;
    sql += whereClause;
  }
  return { sql, args };
};

const remove = (table, conditions = null, returnFields = null) => {
  const { clause, args } = where(conditions);
  let sql = `DELETE FROM ${table} WHERE ${clause}`;
  if (returnFields) sql += `RETURNING ${returnFields.join(", ")}`;
  return { sql, args };
};

const update = (
  table,
  delta = null,
  conditions = null,
  returnFields = null
) => {
  const upd = updates(delta);
  const cond = where(conditions, upd.args.length + 1);
  let sql = `UPDATE ${table} SET ${upd.clause} WHERE ${cond.clause}`;
  const args = [...upd.args, ...cond.args];
  if (returnFields) sql += `RETURNING ${returnFields.join(", ")}`;
  return { sql, args };
};

export default {
  parseFieldsParamsData,
  insert,
  update,
  delete: remove,
  select,
};
