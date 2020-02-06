const { authenticate } = require('@feathersjs/authentication').hooks;
const hydrate = require('feathers-sequelize/hooks/hydrate');

const includeParticipants = () => function (hook) {
  // Will include participant datas only in REST or internal requests
  if (hook.params.provider !== undefined && hook.params.provider !== 'rest') {
    return Promise.resolve(hook);
  }
  const model = hook.app.service('participants').Model;

  // We don't want to publish participant's ID to the public. They will vote using walls-participants ID.
  const association = {
    include: [{
      model,
      attributes: ['name', 'image'],
      through: { attributes: ['id', 'callNumber', 'smsNumber']}
    }]
  };

  switch (hook.type) {
  case 'before':
    hook.params.sequelize = Object.assign(association, { raw: false });
    return Promise.resolve(hook);

  case 'after':
    hydrate(association).call(this, hook);
    break;
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ includeParticipants() ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ includeParticipants() ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
