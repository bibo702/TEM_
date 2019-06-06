var express = require("express");
var router = express.Router();
var middleware=require("../middleware");


router.get ("/landing_page",middleware.isLoggedIn,function(req,res){
     res.render("landing_page",{currentUser:req.user});

 });




module.exports = router ;
