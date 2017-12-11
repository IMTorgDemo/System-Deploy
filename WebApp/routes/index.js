var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;



/* GET home page */
router.get('/', function(req, res, next) {

    //get data from mongo for present
    var DOMAIN = global.config.database.domain
    var IP = global.config.database.ipaddress
    var PORT = global.config.database.port
    var COLLECTION = global.config.database.collection

    var dburl = DOMAIN + IP + PORT + COLLECTION //'mongodb://172.17.0.2:27017/foo';
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        data = '';
        db.collection('bar').find().toArray(function(err, docs) {
            if (err) throw err;
            console.log(docs); //var docs = { 'x': 1, 'y': 2 };

            // choose A/B site
            var random = Math.random();
            if (random > .5) {
                global.log.info('enter index-1');
                res.render('index-1', {
                    title: 'Site-1',
                    data: docs
                });
            } else {
                global.log.info('enter index-2');
                res.render('index-2', {
                    title: 'Site-2'
                });
            }

            db.close();
        });
    });

});

module.exports = router;