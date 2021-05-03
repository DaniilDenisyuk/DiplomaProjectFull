import pg from "pg";

import config from "../../../config/db.js";

const { Pool } = pg;

const pool = new Pool(config);

export default {
  query: (text, params) => pool.query(text, params),
};
