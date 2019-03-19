// Initializes the `Objects` service on path `/objects`
const Service = require('./objects.class.js');
const hooks = require('./objects.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  app.use('/objects', new Service(options))
  app.service('/objects').hooks(hooks)
}
