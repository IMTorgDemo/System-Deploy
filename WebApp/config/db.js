/* 

*** REFACTOR LATER ***


Database
var mongo = require('mongodb');
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://mongo:27017/foo';


mongoose.connect(mongoDB, {
    useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Export model
module.exports = db;*/