const mongoose = require('mongoose')
var schema = new Schema({
  name: {
      type: String,
      index: true,
      unique: true
  },
  updated: { type: Date, default: Date.now },
  doc: [String],
  data: {
    locked: Boolean
  }
})
exports = mongoose.model('Doc', schema);