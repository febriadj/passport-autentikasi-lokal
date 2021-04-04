'use strict'

const mysql = require('mysql')
const { usersTable } = require('./usersTable')

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

const databaseRun = async () => {
  try {
    const db = await conn
    const users = await usersTable()

    db.connect(err => {
      if (err) throw err

      db.query(users, err => err ? console.log(err) : null)
      console.log('Mysql Connected')
    })
  }
  catch(err) {
    console.log(err)
  }
}

databaseRun()

module.exports = conn