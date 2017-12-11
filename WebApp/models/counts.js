var db = require('../config/db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CountsSchema = new Schema({
    x: { type: Number, required: true, max: 100 },
    y: { type: Number, required: true, max: 100 },
});



//Export model
module.exports = mongoose.model('bar', CountsSchema);