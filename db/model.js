const { getRestaurants } = require('./controllers')
const db = require('../db')

exports.fetchRestaurants = () => {

    return db.query('SELECT * FROM restaurants;' )

    .then((result) => {
        return result.rows
    })
}