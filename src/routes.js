const express = require('express');
const DeveloperController = require('./controllers/Developer');
const LikeController = require('./controllers/Like');
const DislikeController = require('./controllers/Dislike');

const routes = express.Router();

routes.get('/developers', DeveloperController.index);
routes.post('/developers', DeveloperController.store);
routes.post('/developers/:developerId/likes', LikeController.store);
routes.post('/developers/:developerId/dislikes', DislikeController.store);

module.exports = routes;