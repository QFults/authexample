const { model, Schema } = require('mongoose')

module.exports = {
  User: require('./User.js')(model, Schema),
  Post: require('./Post.js')(model, Schema)
}
