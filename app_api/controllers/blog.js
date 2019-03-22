var mongoose = require('mongoose');
var blog = mongoose.model('myBlog');
                                                        
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//GET list of all blogs
module.exports.getBlogList = function (req, res) {
  console.log('Getting blogs list');
  blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOnDate: obj.createdOnDate,
      blogId: obj._id
    });
  });
  return blogs;
};


// GET a blog by id
module.exports.getOneBlog = function (req, res) {
  console.log('Getting blog details', req.params);

  if (req.params && req.params.blogId) {
    blog
      .findById(req.params.blogId)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, 
           { "message": "blogId not found" });
          return;

        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogId in request');
    sendJSONresponse(res, 404,
     { "message": "No blogId in request" });
  }
};



//POST a blog
//
module.exports.postBlog = function (req, res) {
  console.log(req.body);
  blog
    .create({
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      createdOnDate: req.body.date
      },      
      function(err, blog) {
       if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
         } else {
          console.log(blog);
          sendJSONresponse(res, 201, blog);
         }
         
        
     });
};                    

//PUT method to update the blog
module.exports.updateBlog = function (req, res) {
    console.log("Updating a blog entry with id of " + req.params.blogId);
    console.log(req.body);
    blog
  	  .findOneAndUpdate(
	     { _id: req.params.blogId },
	     { $set: {"blogTitle" : req.body.blogTitle ,"blogText" : req.body.blogText }},

	     function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    );
};                      


//DELETE a blog
module.exports.deleteBlog = function (req, res) {
    console.log("Deleting blog entry with id of " + req.params.blogId);
    console.log(req.body);
    blog
        .findByIdAndRemove(req.params.blogId)
        .exec (
            function(err, response) {
                if (err) {
                            sendJSONresponse(res, 404, err);
                } else {
                            sendJSONresponse(res, 204, null);
                }
            }
        );
};            
