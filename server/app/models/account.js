var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  name: String,
  balance: Number
});

module.exports = mongoose.model('Account', AccountSchema);