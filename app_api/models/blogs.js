var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
        blogTitle:  {type: String, required: true},
        blogText:  {type: String },
        createdOnDate: { type: Date, "default": Date.now}
  });

mongoose.model('myBlog', blogSchema);
