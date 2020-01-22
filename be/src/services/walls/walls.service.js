// Initializes the `Walls` service on path `/walls`
const { Walls } = require('./walls.class');
const createModel = require('../../models/walls.model');
const hooks = require('./walls.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/walls', new Walls(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('walls');

  service.hooks(hooks);
};
