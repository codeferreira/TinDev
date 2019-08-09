const express = require('express');
const DevController = require('./controllers/Dev')

const routes = express.Router();

routes.post('/devs', DevController.store)

module.exports = routes;