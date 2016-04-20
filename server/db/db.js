var mongoose = require('mongoose');


var connectionString = process.env.DB_HOST;
console.log(connectionString)

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + process.env.DB_HOST);
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose error! ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: ' + process.env.DB_HOST);
});
