'use strict'

const conn = require('../config/database')

exports.registerPage = async (req, res, next) => {
  try {
    if (req.session.passport) return res.status(301).redirect('/')

    res.status(200).render('register', {
      message: undefined
    })
  }
  catch(err) {
    console.log(err)
  }
}

exports.registerPost = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    const sql = await `INSERT INTO users ( username, email, password ) VALUES ( ?, ?, ? )`

    if (password != confirmPassword) {
      return res.status(401).render('register', {
        message: 'Passwords do not match'
      })
    }

    if (password.length && confirmPassword.length < 8) {
      return res.status(401).render('register', {
        message: 'Password length should not be less than 8'
      })
    }

    conn.query(sql, [username, email, password], (err, result) => {
      if (err) return res.status(401).render('register', {
        message: 'Username or Email has been used'
      })

      res.status(301).redirect('/login')
    })
  }
  catch(err) {
    console.log(err)
  }
}