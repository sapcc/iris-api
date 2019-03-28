const { NotAuthenticated } = require('@feathersjs/errors');

const checkReadPermission = (context) => {
  if(context.params.apiClient.permissions.indexOf('read') < 0 || 
    context.params.apiClient.permissions.indexOf('api_admin') < 0 ||
    context.params.apiClient.status !== 'active') {
    return Promise.reject(new NotAuthenticated('Not Authorized'))
  }
}

const checkWritePermission = (context) => {
  if(context.params.apiClient.permissions.indexOf('write') < 0 || 
    context.params.apiClient.permissions.indexOf('api_admin') < 0 ||
    context.params.apiClient.status !== 'active') {
    return Promise.reject(new NotAuthenticated('Not Authorized'))
  }
}
module.exports = {
  before: {
    all: [],
    find: [checkReadPermission],
    get: [checkReadPermission],
    create: [checkWritePermission],
    update: [checkWritePermission],
    patch: [checkWritePermission],
    remove: [checkWritePermission]
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
