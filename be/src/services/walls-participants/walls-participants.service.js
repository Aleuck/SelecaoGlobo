// Initializes the `wallsParticipants` service on path `/walls-participants`
const { WallsParticipants } = require('./walls-participants.class');
const createModel = require('../../models/walls-participants.model');
const hooks = require('./walls-participants.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/walls-participants', new WallsParticipants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('walls-participants');

  service.hooks(hooks);
};
