'use strict'

const conn = require("../config/database")

exports.deleteAccount = async (req, res, next) => {
  try {
    const sql = await 'DELETE FROM users WHERE id = ?'

    conn.query(sql, [req.session.passport.user], err => {
      if (err) throw err

      req.session.destroy(err => {
        res.status(301).redirect('/')
      })
    })
  }
  catch(err) {
    console.log(err)
  }
}