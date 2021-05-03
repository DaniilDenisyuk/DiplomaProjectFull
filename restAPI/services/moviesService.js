import db from "../common/db/database.js";
import queryBuilder from "../common/db/queryBuilder.js";
const defaultTable = "Movies";
const defaultFields = ["id", "title", "release_year", "format", "stars"];

const getMovie = async (movieId) => {
  const { sql, args } = queryBuilder.select(defaultTable, defaultFields, {
    id: movieId,
  });
  const res = await db.query(sql, args);
  return res.rows[0];
};

const getAllMovies = async () => {
  const sql = `SELECT ${defaultFields.toString()} FROM allMovies()`;
  const res = await db.query(sql);
  return res.rows;
};

const createMovie = async ({ title, release_year, format, stars }) => {
  const sql = `SELECT createMovie($1,$2,$3,$4) as id`;
  const args = [title, release_year, format, stars];
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const createBunchOfMovies = async ({ title, release_year, format, stars }) => {
  let sql = "";
  let i = 0;
  const args = [];
  movies.forEach(({ title, release_year, format, stars }) => {
    sql += `SELECT createMovie($${++i}, $${++i}, $${++i}, $${++i});`;
    args.push(title, release_year, format, stars);
  });

  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const updateMovie = async (movieId, movie) => {
  const { sql, args } = queryBuilder.update(
    defaultTable,
    movie,
    { id: movieId },
    ["id"]
  );
  const res = await db.query(sql, args);
  return res.rows[0].id;
};

const deleteMovie = async (movieId) => {
  const sql = "SELECT removeMovie($1) AS id";
  const res = await db.query(sql, [movieId]);
  return res.rows[0].id;
};

export const moviesService = {
  getMovie,
  getAllMovies,
  createBunchOfMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
