/* eslint-disable no-unused-vars */
const { Pool } = require('pg')

class Service {
  constructor (options) {
    this.pool = new Pool()
    this.options = options || {};
  }

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

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

