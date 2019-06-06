//all middleware comes here
var middlewareObj={};


//Middelwar ==check if a user is loggedIN
middlewareObj.isLoggedIn= function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports= middlewareObj