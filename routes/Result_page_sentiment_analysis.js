var express = require("express");
var router = express.Router();
var middleware=require("../middleware");


router.get ("/Result_page_sentiment_analysis",middleware.isLoggedIn,function(req,res){
     res.render("Result_page_sentiment_analysis",{currentUser:req.user});
 
 });




module.exports = router ;