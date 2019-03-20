var express = require('express');
var router = express.Router();
var homectrl = require('../controllers/home');
var blogctrl = require('../controllers/blog');
//var

/* Page Routes */
router.get('/', homectrl.home); //home page GET
router.get('/bloglist', blogctrl.blogList); // bloglist page GET
router.get('/blogadd',blogctrl.blogAdd);   // add blog page GET
router.post('/blogadd', blogctrl.postBlogAdd); //add blog page POST
router.get('/blogedit', blogctrl.blogEdit); // edit blog page GET
router.put('/blogedit/:blogId', blogctrl.blogEditPut); //  edit blog page PUT
router.get('/blogdelete', blogctrl.blogDelete); // delete blog page GET
router.delete('/blogdelete/:blogId', blogctrl.blogDeleteDelete); //delete delete page DELETE


module.exports = router;
