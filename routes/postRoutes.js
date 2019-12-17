const { Post, User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = app => {
  app.get('/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.find()
      .populate('author')
      .then(posts => res.json(posts))
      .catch(e => console.error(e))
  })

  app.post('/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.create({
      ...req.body,
      author: req.user._id
    })
      .then(({ _id }) => User.findByIdAndUpdate(req.user._id, { $push: { posts: _id } })
        .then(() => res.sendStatus(200))
        .catch(e => console.error(e)))
      .catch(e => console.error(e))
  })
}
