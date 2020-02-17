// Initializes the `participants` service on path `/participants`
const { Participants } = require('./participants.class');
const createModel = require('../../models/participants.model');
const hooks = require('./participants.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/participants', new Participants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('participants');

  service.hooks(hooks);
};
