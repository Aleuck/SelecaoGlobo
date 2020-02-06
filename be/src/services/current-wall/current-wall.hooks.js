

const recaptcha = require('../../hooks/recaptcha');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [recaptcha()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
