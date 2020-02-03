// Initializes the `votes` service on path `/votes`
const { Votes } = require('./votes.class');
const createModel = require('../../models/votes.model');
const hooks = require('./votes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create'],
  };

  // Initialize our service with any options it requires
  app.use('/votes', new Votes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('votes');

  service.hooks(hooks);
};
