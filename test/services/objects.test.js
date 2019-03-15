const app = require('../../src/app');

describe('\'Objects\' service', () => {
  it('registered the service', () => {
    const service = app.service('objects');
    expect(service).toBeTruthy();
  });
});
