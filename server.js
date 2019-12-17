require('dotenv').config()
require('./config')

const express = require('express')
const passport = require('passport')
const { join } = require('path')
const { connection } = require('mongoose')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()
const { User } = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(e => cb(e))
))

require('./routes')(app)

connection
  .once('open', () => app.listen(3000))
