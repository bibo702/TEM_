var express = require("express");
var router = express.Router();
var middleware=require("../middleware");
var request = require("request");
result_db=require("../models/result");
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });
 
// TEM_DISCOVERY_INV


const fs = require('fs');
// // json data
// var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 
// // parse json
// var jsonObj = JSON.parse(jsonData);
// console.log(jsonObj);
 
// // stringify JSON Object
// var jsonContent = JSON.stringify(jsonObj);
// console.log(jsonContent);
 
// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });
// Url: https://gateway-fra.watsonplatform.net/discovery/api
 
 

router.get ("/Result_page_sentiment_analysis",function(req,res){
  var params = {
    //  query: 'Invensity gmbh',
    // 'enriched_text.concepts.text':'artificial intelligence',
   
    natural_language_query:'',
    environment_id: 'system',
    collection_id: 'news-en',
    // der Wert für collection_id der deutschen Sammlung news-de
    'configuration_id': '',
   'passages': true, //if you want to enable passages
     return: 'text, title, url',
     count:'5',
     bias:'publication_date',
     highlight: true //if you want to enable highlight
  }
  var query =req.query.data;
        console.log(req.query);
      
        discovery.query(params, (error, results) => {
         if (error) {    
         // console.log(error.body) ;
         console.log(error.code) ;
         req.flash("IBM_message",error.body);
         res.render("Result_page_sentiment_analysis");
        
         } else {
         var jsonContent = JSON.stringify(results, null, 2);

            console.log(JSON.stringify(results, null, 2));
           // console.log('matching_results ==>'+body.data.matching_results + '     Time ==>'+ body.headers.date   ); 
           // console.log("your query was ==>"+ params.natural_language_query);
          // res.render("Result_page_sentiment_analysis",{currentUser:req.user});
    
 
          res.render("Result_page_sentiment_analysis",{jsonContent:jsonContent});
        //   fs.writeFile("output.json",JSON.stringify(results, null, 2) , 'utf8', function (err) {
        //     if (err) {
        //         console.log("An error occured while writing JSON Object to File.");
        //         return console.log(err);
        //     }
        //  console.log("JSON file has been saved.");
        // });

         }
         
         
         });
           
        
 });
 
//   params.natural_language_query=req.query.data;
// router.post ("/Result_page_sentiment_analysis",function(req,res,results,error){
//     var query =req.query.data;
//     params.natural_language_query=req.body.data;
//      console.log(params.natural_language_query);
     
//     discovery.query(params, (error, results,body) => {
//       if (error) {
        
//         console.log(error.body) ;
//       } else {
//         var jsonData = results;
//         // parse json
//         var jsonObj = JSON.parse(jsonData);
//         console.log(jsonObj);
//         // stringify JSON Object
//         var jsonContent = JSON.stringify(jsonObj);
//         //  var jsonContent = JSON.stringify(results, null, 2);
//         fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//           if (err) {
//               console.log("An error occured while writing JSON Object to File.");
//               return console.log(err);
//           }
       
//           console.log("JSON file has been saved.");
//          // console.log(JSON.stringify(results, null, 2));
   
//    // console.log('matching_results ==>'+body.data.matching_results + '     Time ==>'+ body.headers.date   ); 
//    // console.log("your query was ==>"+ params.natural_language_query);
         
//  });
//       }
//     res.render("Result_page_sentiment_analysis",{query:query},{results:results});
//  });
// });
 
// file system module to perform file operations

module.exports = router;
