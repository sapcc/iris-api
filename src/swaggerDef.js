module.exports = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'IRIS API',
      version: process.env.npm_package_version,
      description: `
Here you will find a detailed description of IRIS API.
# Introduction
This API is documented in **OpenAPI format**`
    }
  },
  apis: ['./src/**/*.js']
}
