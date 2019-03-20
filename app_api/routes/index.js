var express = require('express');
var router = express.Router();
var blogCtrl = require('../controllers/blog');



//API route methods
router.get('/blog', blogCtrl.getBlogList); //Return blog list
router.get('/blog/:blogid', blogCtrl.getOneBlog); // RETURN SINGLE BLOG
router.post('/blog', blogCtrl.postBlog); //ADD a BLOG POST method
router.put('/blog/:blogid', blogCtrl.updateBlog); // UPDATE a blog
router.delete('/blog/:blogid', blogCtrl.deleteBlog); // DELETE a blog



module.exports = router;