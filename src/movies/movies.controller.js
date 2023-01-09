const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: `Movie not found.`,
  });
}

async function list(req, res) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.json({ data: await service.isShowing() });
  } else {
    res.json({ data: await service.list() });
  }
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list,
};
