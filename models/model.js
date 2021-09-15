const { deleteRestaurant } = require("../controllers/controller");
const db = require("../db");

exports.fetchRestaurants = () => {
  return db
    .query("SELECT * FROM restaurants;")

    .then((result) => {
      return result.rows;
    });
};

exports.addRestaurant = (newRestaurant) => {
    return db
        .query("INSERT INTO restaurants (restaurant_name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) RETURNING *", [newRestaurant.restaurant_name, newRestaurant.area_id, newRestaurant.cuisine, newRestaurant.website])
        .then((addedRestaurant) => {
            return addedRestaurant.rows[0]
        })
}

exports.removeRestaurant = (restaurant_id) => {
  return db
  .query("DELETE FROM restaurants WHERE restaurant_id = $1 RETURNING *", [restaurant_id])
  .then((deletedRestaurant) => {
    return deletedRestaurant.rows[0]
  })
}

exports.updateRestaurant = (restaurant_id, updateInfo, updateKey) => {
  return db
  .query(`UPDATE restaurants SET ${updateKey} = $1 WHERE restaurant_id = $2 RETURNING *`, [updateInfo.area_id, restaurant_id])
  .then((updatedRestaurant) => {
    return updatedRestaurant.rows[0]
  })
}