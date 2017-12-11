var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var Counts = require('../models/counts.js');


/* GET home page. */
router.get('/', function(req, res, next) {

    var dburl = 'mongodb://172.17.0.3:27017/foo';
    MongoClient.connect(dburl, function(err, db) {
        if (err) { console.log(err); throw err; }
        data = '';
        db.collection('bar').find().toArray(function(err, docs) {
            if (err) throw err;
            console.log(docs);

            var random = Math.random();
            if (random > .5) {
                global.log.info('enter index-1');
                res.render('index-1', { title: 'Site-1', data: docs });
            } else {
                global.log.info('enter index-2');
                res.render('index-2', { title: 'Site-2' });
            }

            db.close();
        });
    });



});

module.exports = router;