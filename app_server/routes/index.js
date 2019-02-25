var express = require('express');
var router = express.Router();
var homectrl = require('../controllers/home');
var blogctrl = require('../controllers/blog');

/* Page Routes */
router.get('/', homectrl.home);
router.get('/bloglist', blogctrl.bloglist);
router.get('/blogadd', blogctrl.blogadd);


module.exports = router;
