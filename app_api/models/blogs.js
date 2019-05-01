var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
        blogTitle:  {type: String, required: true},
        blogText:  {type: String, required: true },
        createdOnDate: { type: Date, "default": Date.now()},
        userEmail:{type: String, required:true},
        userName:{type: String, required:true}
  });

mongoose.model('myBlog', blogSchema);
