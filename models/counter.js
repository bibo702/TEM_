var mongoose = require('mongoose');

// Schema SetUP
var counterSchema = new mongoose.Schema({
  counter: Number
});

module.exports = mongoose.model('counterSchema', counterSchema);
