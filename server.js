'use strict'

const 
  express = require('express')
, app = express()
, passport = require('passport')
, dotenv = require('dotenv').config({ path: './.env' })
, session = require('express-session')
, path = require('path')
, port = process.env.PORT || 8080

/*** @middleware */
// handle body request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public/css')))
app.use(express.static(path.join(__dirname, 'public/javascript')))

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: false
}))

// passport
app.use(passport.initialize())
app.use(passport.session())

require('./middleware/passport')()

app.use(require('./routes/index'))

app.listen(port, err => {
  err ? console.log(err) : console.log('Server running on Port:' + port)
})