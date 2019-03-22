// Application hooks that run for every service
const { NotAuthenticated } = require('@feathersjs/errors');
const log = require('./hooks/log');

const validateAuthToken = (context) => {
  try {
    if(!context.params.authToken) {
      return Promise.reject(
        new NotAuthenticated('Missing auth token. Please check the presence of the header X-AUTH-TOKEN')
      )
    }
    const [apiKey,signature,timestamp] = context.params.authToken.split('.')
    if(!apiKey || !signature || !timestamp) {
      return Promise.reject(new NotAuthenticated('Invalid token. Please check the syntax of X-AUTH-TOKEN'))
    }
    const expirationTime = Number.parseInt(timestamp)
    if(Number.isNaN(expirationTime)) return Promise.reject(new NotAuthenticated('Invalid timestamp.'))
    const now = Math.floor(Date.now/1000)
    if(expirationTime < now+60 || expirationTime > now + 60 * 60 * 2) {
      return Promise.reject(new NotAuthenticated('Token expired!'))
    }
  } catch(e) { return Promise.reject(new NotAuthenticated(e.message))}

}

module.exports = {
  before: {
    all: [ 
      log(),
      validateAuthToken
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
