'use strict'

exports.loginPage = async (req, res, next) => {
  try {
    if (req.session.passport) return res.status(301).redirect('/')
    
    res.status(200).render('login', {
      message: undefined
    })
  }
  catch(err) {
    console.log(err)
  }
}

exports.loginPost = async (req, res, next) => {
  try {    
    res.status(301).redirect('/')
  }
  catch(err) {
    console.log(err)
  }
}