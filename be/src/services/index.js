const users = require('./users/users.service.js');
const participants = require('./participants/participants.service.js');
const seasons = require('./seasons/seasons.service.js');
const walls = require('./walls/walls.service.js');
const votes = require('./votes/votes.service.js');
const wallsParticipants = require('./walls-participants/walls-participants.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(seasons);
  app.configure(participants);
  app.configure(walls);
  app.configure(votes);
  app.configure(wallsParticipants);
  app.configure(images);
};
