var express = require('express');
var router = express.Router();
var blogCtrl = require('../controllers/blog');



//API route methods
router.get('/blog', blogCtrl.blogList); //Return blog list
router.get('/blog/:blogid', blogCtrl.blogGetOne); // RETURN SINGLE BLOG
router.post('/blog', blogCtrl.blogAdd); //ADD a BLOG
router.put('/blog/:blogid', blogCtrl.blogEdit); // UPDATE a blog
router.delete('/blog/:blogid', blogCtrl.blogDelete); // DELETE a blog



module.exports = router;
