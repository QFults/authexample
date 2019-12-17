const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = app => {
  app.post('/users', (req, res) => {
    const { name, email, username } = req.body
    User.register(new User({ name, email, username }), req.body.password, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })

  app.post('/login', (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (e, user) => {
      if (e) throw e
      res.json({
        user: user.username,
        token: jwt.sign({ id: user._id }, process.env.SECRET)
      })
    })
  })
}