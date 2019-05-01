var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({   // Lab 7
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
var blogCtrl = require('../controllers/blog');
var authCtrl = require('../controllers/authentication');  // Lab 7



//API route methods
router.get('/blog', blogCtrl.getBlogList); //Return blog list
router.get('/blog/:blogId', blogCtrl.getOneBlog); // RETURN SINGLE BLOG
router.post('/blog', auth, blogCtrl.postBlog); //ADD a BLOG POST method
router.put('/blog/:blogId', auth, blogCtrl.updateBlog); // UPDATE a blog
router.delete('/blog/:blogId', auth, blogCtrl.deleteBlog); // DELETE a blog

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);



module.exports = router;
