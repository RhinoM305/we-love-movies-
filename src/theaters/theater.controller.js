const service = require("./theater.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;
  const data = await service.list(movieId);

  res.json({ data });
}

async function read(req, res) {
  const { theaterId } = req.params;
  const data = await service.read(theaterId);
  res.json({ data });
}
module.exports = {
  read: asyncErrorBoundary(read),
  list: asyncErrorBoundary(list),
};
