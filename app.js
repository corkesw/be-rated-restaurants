const express = require("express");
const apiRouter = require('./routes/api.router')
const {
  getRestaurants,
  postRestaurant,
  deleteRestaurant
} = require("./controllers/controller.js");
const { handleInvalidPath, handlePsqlErrors, handleCustomErrors, handleServerErrors } = require("./errors/errors.js");

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all("*", handleInvalidPath);

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app;
