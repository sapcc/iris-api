/**
 * @swagger
 * components:
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     UnexpectedError:
 *       description: Unexpected error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   schemas:
 *     # Schema for error response body
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         message:
 *           type: string
 */

const objects = require('./objects/objects.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(objects)
};
