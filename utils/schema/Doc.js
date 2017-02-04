const mongoose = require('mongoose')
var Schema = mongoose.Schema
var schema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  updated: { type: Date, default: Date.now },
  reversion: [{
    content: {type: String, required: true},
    editor: {type: String, required: true} // editor username
  }],
  data: {
    locked: Boolean
  }
})
module.exports = mongoose.model('Doc', schema)
