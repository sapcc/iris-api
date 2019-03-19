/* eslint-disable no-unused-vars */
const { Pool } = require('pg')

/**
 * @swagger
 * definitions:
 *   Object:
 *     type: object
 *     required: 
 *       - id
 *       - name
 *       - object_type
 *       - payload
 *     properties:
 *       id:
 *         type: string
 *       name: 
 *         type: string
 *       object_type:
 *         type: string
 *       payload:
 *         type: string
 *         description: a valid **JSON** string
 */
module.exports = class Service {
  constructor (options) {
    this.pool = new Pool()
    this.options = options || {};
  }

  /**
   * @swagger
   * /objects/{id}:
   *   get:
   *     description: Returns a specific object
   *     tags:
   *       - object
   *     produces:
   *       - application/json
   *     responses: 
   *       200:
   *         description: objects
   *         schema:
   *           $ref: '#/definitions/Object'
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

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

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

