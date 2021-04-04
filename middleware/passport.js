'use strict'

const 
  passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, conn = require('../config/database')
, bcrypt = require('bcryptjs')

module.exports = () => {
  passport.use( 
    new LocalStrategy({ 
      usernameField: 'nameOrEmail', passwordField: 'password' 
    },
    async (nameOrEmail, password, done) => {
      const sql = await `SELECT * FROM users WHERE username = ? OR email = ?`

      conn.query(sql, [nameOrEmail, nameOrEmail], (err, user) => {
        if (err) return done(err)

        if (!user || user.length == 0) {
          return done(null, false, { message: 'user not exists' })
        }
        
        if (bcrypt.compareSync(password, user[0].password) == false) {
          return done(null, false, { message: 'password do not match' })
        }

        return done(null, user[0])
      })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    const sql = 'SELECT * FROM users WHERE id = ?'

    conn.query(sql, [id], (err, user) => {
      done(err, user)
    })
  })
}
