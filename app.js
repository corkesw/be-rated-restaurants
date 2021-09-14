const express = require ('express')
const { message, getRestaurants } = require ('./controllers/controller.js')

//console.log(message)
const app = express()

app.get('/api', message)

app.get('/api/restaurants', getRestaurants)








module.exports = app