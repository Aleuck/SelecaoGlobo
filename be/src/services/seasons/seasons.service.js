// Initializes the `Seasons` service on path `/seasons`
const { Seasons } = require('./seasons.class');
const createModel = require('../../models/seasons.model');
const hooks = require('./seasons.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/seasons', new Seasons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('seasons');

  service.hooks(hooks);
};
