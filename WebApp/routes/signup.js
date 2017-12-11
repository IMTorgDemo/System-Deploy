var express = require('express');
var router = express.Router();


/* GET /signup  */
router.get('/', function(req, res, next) {
    global.log.info(req.cookies);
    res.json({ 'msg': 'respond with signup service' });
});

module.exports = router;