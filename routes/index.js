var express = require('express');
var router = express.Router();
var test = require('../modules/handle/test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});

router.get('/add', function(req, res, next) {
    test.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    test.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    test.queryById(req, res, next);
});

router.get('/delete', function(req, res, next) {
    test.delete(req, res, next);
});

router.get('/update', function(req, res, next) {
    res.render('update');
});

router.post('/updateTest', function(req, res, next) {
    test.update(req, res, next);
});

module.exports = router;