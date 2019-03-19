/* eslint-disable no-unused-vars */
const { Pool } = require('pg')

/**
 * @swagger
 * components:
 *   schemas:
 *     Object:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name: 
 *           type: string
 *         object_type:
 *           type: string
 *         created_at: 
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         payload:
 *           type: string
 *           description: a valid **JSON** string
 *
 *     Object New:
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
   *     description: Retrieve a list of objects
   *     summary: GET /objects
   *     tags:
   *       - object
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: searchTerm
   *         description: Term for the full-text search   
   *         schema:
   *           type: string
   *           example: '?searchTerm=test'
   *       - in: query
   *         name: idIn
   *         description: comma separeted list of object ids to retrieve corresponding objects 
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
   *     responses: 
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Object'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
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
   *         description: objects list
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Object' 
   *       400:
   *         $ref: '#/components/responses/BadRequest'
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
   *             $ref: '#/components/schemas/Object New'
   *     produces:
   *       - application/json
   *     responses: 
   *       201:
   *         description: Created
   *       202:
   *         description: Updated
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

  async remove (id, params) {
    return { id };
  }
}

