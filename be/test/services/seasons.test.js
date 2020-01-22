const assert = require('assert');
const app = require('../../src/app');

describe('\'Seasons\' service', () => {
  it('registered the service', () => {
    const service = app.service('seasons');

    assert.ok(service, 'Registered the service');
  });
});
