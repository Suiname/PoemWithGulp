var mongoose = require('mongoose');

var PrivateMsgSchema = new mongoose.Schema({
 recipients: [],
 chatHistory: [{
  timestamp: String,
  recipient: String,
  sender: String,
  content: String
 }]
})





module.exports = mongoose.model('PrivateMsgSchema', PrivateMsgSchema)
