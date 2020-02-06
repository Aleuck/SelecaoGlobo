const assert = require('assert');
const app = require('../../src/app');

describe('\'current-wall\' service', () => {
  it('registered the service', () => {
    const service = app.service('current-wall');

    assert.ok(service, 'Registered the service');
  });
});
