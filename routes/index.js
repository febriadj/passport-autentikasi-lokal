'use strict'

const 
  router = require('express').Router()
, passport = require('passport')

const 
  { loginPage, loginPost } = require('../controllers/login')
, { registerPage, registerPost } = require('../controllers/register')
, { dashboardPage } = require('../controllers/dashboard')
, { logout } = require('../controllers/logout')
, { deleteAccount } = require('../controllers/delete')
, { changePasswordPage, changePasswordPost } = require('../controllers/changePassword')

// router login
router.get('/login', loginPage)
router.post('/login', passport.authenticate('local'), loginPost)

// router register
router.get('/register', registerPage)
router.post('/register', registerPost)

// router logout
router.get('/logout', logout)

// router delete account
router.get('/delete', deleteAccount)

// router change password
router.get('/change', changePasswordPage)
router.post('/change', changePasswordPost)

// router dashboard
router.get('/', dashboardPage)

module.exports = router