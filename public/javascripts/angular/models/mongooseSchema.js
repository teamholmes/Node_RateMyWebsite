//https://thinkster.io/mean-stack-tutorial/

var mongoose = require('mongoose');

// define model =================
var ReviewSchema = mongoose.model('Review', {
   Id: String,
    Name: String,
    URL: String,
    DateAdded: { type: Date, default: Date.now },
});


module.exports = ReviewSchema;
