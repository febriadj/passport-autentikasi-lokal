'use strict'

const conn = require('../config/database')

exports.changePasswordPage = async (req, res, next) => {
  try {
    if (!req.session.passport) return res.status(301).redirect('/login')

    res.status(200).render('changePassword', {
      message: undefined
    })
  }
  catch(err) {
    console.log(err)
  }
}

exports.changePasswordPost = async (req, res, next) => {
  const 
    userId = req.session.passport.user
  , { password, confirmPassword } = req.body
  , sql = await 'UPDATE users SET password = ? WHERE id = ?'

  try {
    if (password != confirmPassword) {
      return res.status(401).render('changePassword', {
        message: 'Passwords do not match'
      })
    }

    conn.query(sql, [password, userId], (err, result) => {
      if (err) throw err

      res.status(301).redirect('/')
    })
  }
  catch(err) {
    console.log(err)
  }
}