/* eslint-disable no-unused-vars */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         api_key: 
 *           type: string
 *         secret:
 *           type: string
 *         permissions:
 *           type: string
 *         created_at: 
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         name: 
 *           type: string
 *         status:
 *           type: string
 *       example:
 *         id: 1
 *         api_key: trt23534h-j5g3-45g3-4g5g-we67w6e34j5g34
 *         secret: 8126361sdss27836sdad99dsdsdsd7s6
 *         permissions: write
 *         created_at: 2019-03-21T16:11:18Z
 *         updated_at: 2019-03-21T16:11:18Z
 *         name: Alert Service
 *         status: active
 *
 *     ClientNew:
 *       type: object
 *       required: 
 *         - permissions
 *         - name
 *       properties:
 *         name: 
 *           type: string
 *           description: any non empty name (e.g. AlertService)
 *         permissions:
 *           type: string
 *           description: comma separated values (write, read)
 *
 *     ClientUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         permissions:
 *           type: string
 *           description: comma separated values (write, read)
 */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  /**
   * @swagger
   * /clients:
   *   get:
   *     description: Retrieve a list of clients (**ONLY FOR API ADMIN**)
   *     summary: GET /clients
   *     tags:
   *       - clients
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: 'name'
   *         description: find by name   
   *         schema:
   *           type: string
   *           example: '?name=test'
   *       - in: query
   *         name: api_key
   *         description: find by api_key
   *         schema:
   *           type: string        
   *           example: '?api_key=123456'
   *       - in: query
   *         name: permissionsIn
   *         description: comma separeted list of permissions to retrieve corresponding clients
   *         schema:
   *           type: string        
   *           example: '?permissionsIn=write,read'
   *       - 
   *         $ref: '#/components/parameters/page'
   *       -
   *         $ref: '#/components/parameters/per_page'
   *
   *     responses: 
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _metadata:
   *                   $ref: '#/components/schemas/Metadata'
   *                 clients:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Client'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */

  async find (params) {
    return [];
  }

  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     description: Retrieve a specific client (**ONLY FOR API ADMIN**)
   *     summary: GET /clients/{id}
   *     tags:
   *       - client
   *     produces:
   *       - application/json
   *     responses: 
   *       200:
   *         description: client
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Client' 
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  /**
   * @swagger
   * /clients:
   *   post:
   *     description: Create a new client (**ONLY FOR API ADMIN**)
   *     summary: POST /clients
   *     tags:
   *       - client
   *       - create
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClientNew'
   *     produces:
   *       - application/json
   *     responses: 
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Client' 
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  /**
   * @swagger
   * /clients/{id}:
   *   put:
   *     description: Update a client (**ONLY FOR API ADMIN**)
   *     summary: PUT /clients/{id} 
   *     tags:
   *       - client
   *       - update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClientUpdate'
   *     produces:
   *       - application/json
   *     responses: 
   *       202:
   *         description: Updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Client' 
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async update (id, data, params) {
    return data;
  }

  /**
   * @swagger
   * /clients/{id}:
   *   delete:
   *     description: Remove a client (**ONLY FOR API ADMIN**)
   *     summary: DELETE /clients/{id}
   *     tags:
   *       - client
   *       - delete
   *       - remove
   *     produces:
   *       - application/json
   *     responses: 
   *       204:
   *         description: Successfully processed
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;