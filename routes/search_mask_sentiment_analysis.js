var express = require("express");
var router = express.Router();
var middleware=require("../middleware");


router.get ("/search_mask_sentiment_analysis",middleware.isLoggedIn,function(req,res){
     res.render("search_mask_sentiment_analysis",{currentUser:req.user});
 
 });




module.exports = router ;
