var express = require("express");
var bodyParser = require("body-parser")
var router = express.Router();
var middleware=require("../middleware");
result_db=require("../models/result");
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });

router.use(bodyParser.urlencoded({extended: true}));
// https://github.com/watson-developer-cloud/node-sdk#iam
// var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
// var fs = require('fs'); 

// Api Schlüssel : 18Byo1mG23FQhlyqRMrRFMIVY4vxT1djV2wKMmxIaSkZ
// Api URL: https://gateway-fra.watsonplatform.net/discovery/api 
// # OR IAM API key and URL
   
router.get ("/search_mask_sentiment_analysis",function(req,res){
 console.log("you are in search mask");
    res.render("search_mask_sentiment_analysis",{currentUser:req.user} );
 });
 
module.exports = router ;
