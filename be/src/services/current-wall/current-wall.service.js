// Initializes the `current-wall` service on path `/current-wall`
const { CurrentWall } = require('./current-wall.class');
const hooks = require('./current-wall.hooks');

module.exports = function (app) {
  const options = {
    app,
  };

  // Initialize our service with any options it requires
  app.use('/current-wall', new CurrentWall(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('current-wall');

  service.hooks(hooks);
};
