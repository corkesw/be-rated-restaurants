const apiRouter = require('express').Router();
const { message } = require('../controllers/controller.js');
const restaurantRouter = require('./restaurants.router.js')

apiRouter.get('/', message)

apiRouter.use('/restaurants', restaurantRouter)

module.exports = apiRouter