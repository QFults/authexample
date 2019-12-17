module.exports = require('mongoose')
.connect('mongodb://localhost/my_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})