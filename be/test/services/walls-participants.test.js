const assert = require('assert');
const app = require('../../src/app');

describe('\'wallsParticipants\' service', () => {
  it('registered the service', () => {
    const service = app.service('walls-participants');

    assert.ok(service, 'Registered the service');
  });
});
