const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function movieReviews(req, res) {
  const { movieId } = req.params;
  res.json({ data: await service.movieReviews(movieId) });
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.delete(reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { reviewId } = req.params;
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  const data = await service.read(reviewId);
  res.json({ data });
}

module.exports = {
  delete: [reviewExists, asyncErrorBoundary(destroy)],
  movieReviews: [asyncErrorBoundary(movieReviews)],
  update: [reviewExists, asyncErrorBoundary(update)],
};
