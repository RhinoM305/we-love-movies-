const knex = require("../db/connection");

const tableName = "movies";

function list() {
  return knex(tableName).select();
}

function isShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
}

module.exports = {
  isShowing,
  list,
  read,
};
