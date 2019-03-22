/* eslint-disable no-unused-vars */
const { Pool } = require('pg')

/**
 * @swagger
 *     
 * components:
 *   schemas:
 *     Object:
 *       type: object
 *       properties:
 *         client_id: 
 *           type: integer
 *         id:
 *           type: string
 *         name: 
 *           type: string
 *         object_type:
 *           type: string
 *         payload:
 *           type: string
 *           description: a valid **JSON** string
 *         created_at: 
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         client_id: 1
 *         id: '123456789'
 *         name: 'test'
 *         object_type: 'server'
 *         payload: '{"name": "test", "id": "123456789", "network_id": "987654321"}'
 *         created_at: 2019-03-21T15:47:10Z
 *         updated_at: 2019-03-21T15:47:10Z
 *
 *     ObjectNew:
 *       type: object
 *       required: 
 *         - id
 *         - name
 *         - object_type
 *         - payload
 *       properties:  
 *         id:
 *           type: string
 *         name: 
 *           type: string
 *         object_type:
 *           type: string
 *         payload:
 *           type: string
 *           description: a valid **JSON** string
 */
module.exports = class Service {
  constructor (options) {
    this.pool = new Pool()
    this.options = options || {};
  }

  /**
   * @swagger
   * /objects:
   *   get:
   *     description: Retrieve a list of objects. Returns all objects if no query parameter is provided.
   *     summary: GET /objects
   *     tags:
   *       - objects
   *       - find
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: client_id
   *         description: Find all objects by client id **ONLY FOR API ADMIN**
   *         schema:
   *           type: string
   *           example: '?client_id=1'
   *       - in: query
   *         name: searchTerm
   *         description: Term for the full-text search   
   *         schema:
   *           type: string
   *           example: '?searchTerm=test'
   *       - in: query
   *         name: idIn
   *         description: comma separated list of object ids to retrieve corresponding objects 
   *         schema:
   *           type: string        
   *           example: '?idIn=1,2,3,4,5'
   *       - in: query
   *         name: typeIn
   *         description: comma separeted list of object types to retrieve corresponding objects 
   *         schema:
   *           type: string        
   *           example: '?typeIn=server,ip'
   *       - in: query
   *         name: where
   *         description: 'key,value. Multiple Where clauses are combined with AND'
   *         schema:
   *           type: string
   *           example: '?where=network_id,1'
   *       - 
   *         $ref: '#/components/parameters/page'
   *       -
   *         $ref: '#/components/parameters/per_page'
   *       - in: query
   *         name: includeMetadata
   *         schema:
   *           type: bool
   *           default: true
   *           example: '?includeMetadata=true'
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
   *                 objects:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Object'
   *
   *         headers:
   *           Link: 
   *             description: pagination links
   *             schema:
   *               type: string
   *               example: 
   *                 '<https://iris-api.cloud.sap/objects?limit=20&page=5>; rel="next",
   *                  <https://iris-api.cloud.sap/objects?limit=20&page=10>; rel="last", 
   *                  <https://iris-api.cloud.sap/objects?limit=20&page=1>; rel="first",
   *                  <https://iris-api.cloud.sap/objects?limit=20&page=4>; rel="prev"'
   *                        
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async find (params) {
    const client = await this.pool.connect()
    try {
      const res = await client.query({text: 'SELECT * FROM objects'})
      client.release()
      return res.rows
    } catch(e) { 
      return e //console.error(e.stack)
    }
  }
  
  /**
   * @swagger
   * /objects/{id}:
   *   get:
   *     description: Retrieve a specific object
   *     summary: GET /objects/{id}
   *     tags:
   *       - object
   *     produces:
   *       - application/json
   *     responses: 
   *       200:
   *         description: object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Object' 
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
   * /objects:
   *   post:
   *     description: Add or update an object
   *     summary: POST /objects
   *     tags:
   *       - object 
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ObjectNew'
   *     produces:
   *       - application/json
   *     responses: 
   *       201:
   *         description: Created
   *       202:
   *         description: Updated
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/UnexpectedError'
   */
  async create (data, params) {
    const text = 'INSERT INTO objects(id, name, object_type, payload) VALUES($1, $2, $3, $4) RETURNING *'
    const client = await this.pool.connect()
    try {
      const res = await client.query(text, [data.id, data.name, data.object_type, data.payload])
      client.release()
      return res.rows[0]
    } catch(e) {
      return e
      //console.error(e.stack)
    }
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  /**
   * @swagger
   * /objects/{id}:
   *   delete:
   *     description: Remove an object 
   *     summary: DELETE /objects/{id}
   *     tags:
   *       - object
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

