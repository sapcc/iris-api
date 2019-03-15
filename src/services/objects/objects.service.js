// Initializes the `Objects` service on path `/objects`
const createService = require('./objects.class.js');
const hooks = require('./objects.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/objects', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('objects');

  service.hooks(hooks);
};
