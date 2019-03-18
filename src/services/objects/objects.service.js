// Initializes the `Objects` service on path `/objects`
const createService = require('./objects.class.js');
const hooks = require('./objects.hooks');


module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  const objectsService = createService(options)
  apiDoc(objectsService)

  // Initialize our service with any options it requires
  app.use('/objects', objectsService);

  // Get our initialized service so that we can register hooks
  const service = app.service('objects');

  service.hooks(hooks);
}

const apiDoc = (service) => {
  service.docs = {
    description: 'Objects',
    get: {
      parameters: [],
      security: [],
    },
    find: {
      security:[]
    },
    create: {
      description: "Creates a new object entry",
      security: [],
      requestBody: {
        content: {
          "application/json": {
            "schema": {
              "$ref": "#/definitions/objects%20new",
            },
            example: {
              "id": "123456789",
              "name": "Test",
              "object_type": "server",
              "payload": "{\"id\": \"123456789\", \"name\": \"Test\", \"network_id\": \"12345678\"}"
            }
          }
        }
      }
    },
    remove: {
      security:[]
    },
    update: {
      security: []
    },
    patch: {
      security: []
    },
    definitions: {
      "objects new": {
        type: "object",
        required: ["id","name","object_type","payload"],
        properties: {
          id: {
            "description": "This should be a unique identifier for the object",
            "type": "string"
          },
          name: {
            "description": "Name of the object",
            "type": "string"
          },
          object_type: {
            "description": "Type of the object such as server, ip, network, ...",
            "type": "string"
          },
          payload: {
            "description": "Object data in JSON  format",
            "type": "string"
          }
        },
      },
      "objects": {
        type: "object",
        properties: {
          id: {
            "description": "This should be a unique identifier for the object",
            "type": "string"
          },
          name: {
            "description": "Name of the object",
            "type": "string"
          },
          object_type: {
            "description": "Type of the object such as server, ip, network, ...",
            "type": "string"
          },
          payload: {
            "description": "Object data in JSON  format",
            "type": "string"
          }
        } 
      },
      "objects list": {
        type: "array"
      }
    }
  }
};
