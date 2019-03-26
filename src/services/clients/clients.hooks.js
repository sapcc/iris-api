const { NotAuthenticated } = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [
      (context) => {
        if(!context.params.is_api_admin) return Promise.reject(new NotAuthenticated('Not Authorized'))
      }
    ],
    find: [],
    get: [],
    create: [],
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
