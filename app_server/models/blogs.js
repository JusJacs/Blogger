var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blogTitle:String,
        blogText:String,
        createdOnDate: {
            type: Date,
            "default": Date.now
	}

  });

mongoose.model('My Blogger', blogSchema);
