var express = require('express');
var router = express.Router();
var homectrl = require('../controllers/home');
var blogctrl = require('../controllers/blog');
//var

/* Page Routes */
router.get('/', homectrl.home);
router.get('/bloglist', blogctrl.blogList); //RETURN LIST with api
router.get('/blogadd',blogctrl.blogAdd);   //
router.post('/blogadd', blogctrl.postBlogAdd); //ADD a BLOG
router.get('/blogedit/:blogid', blogctrl.blogGetOne); // get SINGLE BLOG for edit or delete
router.put('/blogedit/:blogid', blogctrl.blogEdit); // UPDATE a blog
router.delete('/blogdelete/:blogid', blogctrl.blogDelete); // DELETE a blog


module.exports = router;
