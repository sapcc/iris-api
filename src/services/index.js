/**
 * @swagger
 * components:
 *   parameters:
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         example: '?page=2'
 *     per_page:
 *       in: query
 *       name: per_page
 *       schema:
 *         type: integer
 *         maximum: 500
 *         minimum: 1
 *         default: 50
 *         example: '?per_page=20'
 *       
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
 *     
 *     Metadata:
 *       type: object
 *       properties:
 *         page: 
 *           type: integer
 *         per_page: 
 *           type: integer
 *         page_count: 
 *           type: integer
 *         total_count:
 *           type: integer
 *         links:
 *           type: array
 *           itiems: 
 *             type: object
 *             properties:
 *               self: 
 *                 type: string
 *               first:
 *                 type: string
 *               previous:
 *                 type: string
 *               next:
 *                 type: string
 *               last: 
 *                 type: string
 *       example:
 *         page: 5
 *         per_page: 20
 *         page_count: 20
 *         total_count: 521
 *         links: [
 *           { "self": "/resource?page=5&per_page=20" },
 *           { "first": "/resource?page=1&per_page=20" },
 *           { "previous": "/resource/?page=4&per_page=20" },
 *           { "next": "/resource?page=6&per_page=20" },
 *           { "last": "/resource?page=20&per_page=20" }
 *         ]
 */

const objects = require('./objects/objects.service.js');
const clients = require('./clients/clients.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
 app.configure(objects)
 app.configure(clients);
};
