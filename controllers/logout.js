'use strict'

exports.logout = async (req, res, next) => {
  try {
    if (!req.session.passport) return res.status(301).redirect('/')

    req.session.destroy(err => {
      res.status(301).redirect('/')
    })
  }
  catch(err) {
    console.log(err)
  }
}