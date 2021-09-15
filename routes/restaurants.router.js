const {
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
  patchRestaurant
} = require("../controllers/controller");

const restaurantsRouter = require("express").Router();

restaurantsRouter.route("/").get(getRestaurants).post(postRestaurant);

restaurantsRouter.delete("/:restaurant_id", deleteRestaurant);

restaurantsRouter.patch("/:restaurant_id", patchRestaurant)

module.exports = restaurantsRouter;
