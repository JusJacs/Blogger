/* Blog Add */
module.exports.blogadd = function (req, res) {
  res.render('blogadd', {title: 'Add Blog' });
};


/* Blog List */
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

/* get blog edit page */
module.exports.blogedit = function(req, res) {
   res.render('blogedit', {
   title:' Edit Blog' });
};

/* get blog delete page */
module.exports.blogdelete = function(req, res) {
   res.render('blogdelete', {
   title:'Delete Blog' });
};


