/* Blog Add */
module.exports.blogadd = function (req, res) {
  res.render('blogadd', {title: 'Add Blog' });
};

/* Blog List */
module.exports.bloglist = function(req, res) {
 res.render('bloglist', {title: 'Blog List' });
};

