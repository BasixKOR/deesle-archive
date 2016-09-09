const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var schema = new Schema({
  name: {
      type: String,
      index: true,
      unique: true
  },
  updated: { type: Date, default: Date.now },
  doc: {
    type: [String],
    required: true
  },
  data: {
    locked: Boolean
  }
})
module.exports = mongoose.model('Doc', schema);