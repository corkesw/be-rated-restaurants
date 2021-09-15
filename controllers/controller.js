const app = require("../app");
const {
  fetchRestaurants,
  addRestaurant,
  removeRestaurant,
  updateRestaurant
} = require("../models/model");

exports.message = (req, res) => {
  res.status(200).send({ msg: "all ok" });
};

exports.getRestaurants = (req, res) => {
  fetchRestaurants().then((result) => {
    res.status(200);
    res.send({ restaurants: result });
  });
};

exports.postRestaurant = (req, res, next) => {
  newRestaurant = req.body;
  addRestaurant(newRestaurant)
    .then((restaurant) => {
      res.status(201).send({ restaurant });
    })
    .catch(next);
};

exports.deleteRestaurant = (req, res, next) => {
  restaurant_id = req.params.restaurant_id;
  removeRestaurant(restaurant_id)
    .then((deletedRestaurant) => {
      if (!deletedRestaurant) {
        return Promise.reject({
          status: 404,
          msg: `No entry found for restaurant_id ${restaurant_id}`
        })
      }
      res.status(204).send({});
    })
    .catch(next);
};

exports.patchRestaurant = (req, res, next) => {
  restaurant_id = req.params.restaurant_id;
  updateInfo = req.body
  updateKey = Object.keys(req.body)[0]
  updateRestaurant(restaurant_id, updateInfo, updateKey)
  .then((updatedRestaurant) => { 
    res.status(200).send({restaurant: updatedRestaurant})
  })
  .catch(next)
}
