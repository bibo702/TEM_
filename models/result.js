var mongoose = require ("mongoose");

// Schema SetUP
var resultSchema = new mongoose.Schema({
    url: String,
    crawl_date: String,
    text: String,
    sentiment: String

    
});

module.exports = mongoose.model("result", resultSchema);