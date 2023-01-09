const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theater.router");
const reviewsRouter = require("../reviews/reviews.router");

router.use("/:movieId/reviews", reviewsRouter);

router.use("/:movieId/theaters", theatersRouter);

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
