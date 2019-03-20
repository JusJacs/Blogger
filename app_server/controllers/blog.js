//Request object
var request = require('request');
var apiOptions = {
	server : 'http://localhost'
     }



/* Blog Add */
module.exports.blogAdd = function (req, res) {
  res.render('blogadd', {title: 'Add Blog' });
};

/* Blog Add (Post) */
module.exports.postBlogAdd = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blog';
    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        createdOnDate: Date.now()
    }; 

    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    
    request(
      requestOptions,
      function(err, response, body) {
	console.log("made into function of request part");
         if (response.statusCode === 201) {
              res.redirect('/bloglist');
         }  else {
	      console.log(response.statusCode);
              _showError(req, res, response.statusCode);
         } 
      }
    ); 
};             


//Errors to show
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Looks like we can't find this page. Sorry!";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "Sorry! There's a problem with our server.";
  } else {
    title = status + ", something's  wrong";
    content = "Something, somewhere, is  wrong.";
  }
  res.status(status);
  res.render('bloglist', {
    title : title,
    content : content
  });
};


//New (GET) blogs list
module.exports.blogList = function(req, res){
    var requestOptions, path;
    path = "/api/blog";
    requestOptions = { 
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {} 
        };
    request(
        requestOptions,
        function(err, response, body) {
           if(err) {
		console.log(err);
	    } else if (response.statusCode === 200) {
		console.log("Blogs List: " + body.length);
	        renderBlogList(req, res, body);
	    } else {
		console.log(response.statusCode);
	    }
	}
    );
};
        

/* Render the book list page */
var renderBlogList = function(req, res, responseBody) {
    res.render('bloglist', {
        title: 'Blog List',
        blogList: responseBody
    });
};    


/* Lab 3 Blog List 
module.exports.bloglist = function(req, res) {
    res.render('bloglist', {
	title: 'Blog List',
	blog: [{
	                 blogTitle:' First Blog Entry',
	                 blogText: 'This is my first blog entry',
	                 createdOnDate: new Date("2019-02-20")
	             },
		     {
			 blogTitle:'Second Blog Entry',
			 blogText:'This is my second blog entry',
			 createdOnDate: new Date("2019-02-20")

		     },
		     {
			  blogTitle:'Third Blog Entry',
			  blogText:'This is my third blog entry',
			  createdOnDate: new Date ("2019-02-20")
		     }]  
               }); 
			
};
*/

// GET a blog by id
module.exports.blogGetOne = function (req, res) {
    var requestOptions, path;
    path = "/api/bloglist/" + req.params.id;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
          renderListPage(req, res, body);
        }
    );
};








/* get blog edit page */
module.exports.blogEdit = function(req, res) {
    var requestOptions, path;
    path = "/api/blog/" + req.params.id;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    }; 
    request(
        requestOptions,
        function(err, response, body) {
                renderBlogEditPage(req, res, body);
	}
    );
};

/* Render blog edit page */
var renderBlogEditPage = function(req, res, responseBody){
    res.render('blogedit', {
        title: 'Blog Info',
        pageHeader: {
                title: 'Blog Info'
        },
        blog: responseBody
    });
};



//blogEdit POST
module.exports.blogEditPost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blog/' + id;

    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText
    };

    requestOptions = {
        url : apiOptions + path,
        method : "PUT",
        json : postdata
    };

    request(
	requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/bloglist');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};
 



/* get blog delete page */
module.exports.blogDelete = function(req, res) {
   var requestOptions, path;
    path = "/api/blog/" + req.params.id;
    requestOptions = {
        url : apiOptions + path,
        method : "GET",
        json : {}
    };
    request(
	requestOptions,
        function(err, response, body) {
            renderBlogDelete(req, res, body);
        }
    );
};

/* Render the blog delete page */
var renderBlogDelete = function(req, res, responseBody){
        res.render('blogdelete', {
        title: 'BLog Delete',
        pageHeader: {
                title: 'Blog Delete'
        },
        blog: responseBody
    });
};

/* blogDelete ( post delete to db)  */
module.exports.blogDeletePost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blog/' + id;

    requestOptions = {
	url : apiOptions + path,
        method : "DELETE",
        json : {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/bloglist');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};               


















