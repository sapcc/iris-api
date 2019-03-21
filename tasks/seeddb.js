require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})
client.connect()

client.query(`INSERT INTO clients(api_key,secret,permissions) VALUES('${process.env.ADMIN_API_KEY}','${process.env.ADMIN_API_SECRET}','{"api_admin"}') ON CONFLICT(api_key) DO UPDATE SET secret='${process.env.ADMIN_API_SECRET}'`, (err, res) => {
  if(err) {
    if(err.code === '42P04') {
      console.info(err.message) 
    } else {
      console.log(err)
    }
  }
  client.end()
})
