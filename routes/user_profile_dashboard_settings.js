var express = require("express");
var router = express.Router();
var middleware=require("../middleware");


router.get ("/user_profile_dashboard_settings",middleware.isLoggedIn,function(req,res){
     res.render("user_profile_dashboard_settings",{currentUser:req.user});
console.log(req.user);
 });




module.exports = router ;
