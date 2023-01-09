const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});

function movieReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.*",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at"
    )
    .where({ "r.movie_id": movieId })
    .then((columns) => columns.map((column) => addCritics(column)));
}

function read(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.*",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at"
    )
    .where({ review_id: reviewId })
    .first()
    .then(addCritics);
}
//
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

module.exports = {
  delete: destroy,
  movieReviews,
  read,
  update,
};
