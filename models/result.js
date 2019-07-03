var mongoose = require ("mongoose");

// Schema SetUP
var resultSchema = new mongoose.Schema({
    name: String,
     
    
});

module.exports = mongoose.model("result", resultSchema);