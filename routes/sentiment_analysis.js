var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var request = require('request');
result_db = require('../models/result');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });
const fs = require('fs');
const parseJson = require('parse-json');
var fileManger = require('../middleware/fileManager');

// function readJSONFile(filename, callback) {
//   fs.readFile(filename, function (err, data) {
//     if(err) {
//       callback(err);
//       return;
//     }
//     try {
//       callback(null, JSON.parse(data));
//     } catch(exception) {
//       callback(exception);
//     }
//   });
// }

// // TEM_DISCOVERY_INV
// var params = {
//   //  query: 'Invensity gmbh',
//   // 'enriched_text.concepts.text':'artificial intelligence',

//     // query: "TESLA",
//     // filter: "language:(english|en),crawl_date>2019-05-05T12:00:00+0200,crawl_date<2019-07-05T12:00:00+0200",
//     // "deduplicate": true,
//     // "count": 5,
//     // "return": "title,url,host,crawl_date"

//   natural_language_query:'',
//   environment_id: 'system',
//   collection_id: 'news-en',
//   // der Wert für collection_id der deutschen Sammlung news-de
//   'configuration_id': '',
//  'passages': true, //if you want to enable passages
//   //  return: 'text, title, url',
//    count:'5',
//    bias:'publication_date',
//    highlight: false //if you want to enable highlight
// }

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

//@route GET /search_mask_sentiment_analysis
//@desc  GET the search mask for the sentiment analysis
//@acces Public
router.get('/search_mask_sentiment_analysis', function(req, res) {
  console.log('you are in search mask');

  res.render('./sentiment_analysis/search_mask_sentiment_analysis', {
    currentUser: req.user
  });
});

//@route GET Result_page_sentiment_analysis
//@desc  GET theResult_page_sentiment_analysis
//@acces Public
router.get('/Result_page_sentiment_analysis', function(req, res) {
  var query = req.query.data;
  console.log('Your query is : ' + query, 'count is', req.body.count);

  var params = {
    //  query: 'Invensity gmbh',
    // 'enriched_text.concepts.text':'artificial intelligence',
    environment_id: 'system',
    collection_id: 'news-en',
    configuration_id: '',
    passages: true, //if you want to enable passages
    // natural_language_query:'',
    query: req.query.data,
    return: 'title,url,host,crawl_date',
    count: req.body.count, //parseInt(req.body.input.count)
    bias: 'publication_date',
    highlight: true //if you want to enable highlight
  };

  // To do's counter einbauen
  discovery.query(params, (error, results) => {
    if (error) {
      // console.log(error.body) ;
      console.log(error.code);
      req.flash('IBM_message', error.body);
      res.render('./sentiment_analysis/Result_page_sentiment_analysis', {
        currentUser: req.user,
        query: query
      });
    } else {
      //     // var dataresults=results;
      //    // to save the output in different json with current time and date
      var today = new Date();
      var date =
        today.getFullYear() +
        '_' +
        (today.getMonth() + 1) +
        '_' +
        today.getDate();
      var today = new Date();
      var time =
        today.getHours() + 'h' + today.getMinutes() + 's' + today.getSeconds();
      var datetime = date + '_' + time + '.json';
      var filename = __dirname + '/../data/' + datetime;
      //     // fileManger.createNewFile(filename);
      // -------------------------d'abord stringfy---------------------------------------------------------------------------------
      var jsonContent = JSON.stringify(results, null, 2);
      // ----------------------------------------------------------------------------------------------------------

      //     // console.log(JSON.stringify(results, null, 2));
      //     // var jsonContents = JSON.parse(results);
      //     // console.log(jsonContents);
      //     // fileManger.saveJsonObjectToFile(jsonContents,filename);

      //     // console.log(jsonContents);
      //     // var jsonContentparsed = JSON.parse(results);

      // //     // ___________________SAVED RESULT OF THE LAST QUERY TO WORK WITH IT______________________
      // //     //    Todo's : ouput mit datum speichern (und uhrzeit) filename =datum und uhrzeit als variable speichern und dan variable als filename
      // //     //   den datei namen zusammenbauer var fileame = string output+datum+uhrzeit
      // //     //   write file=filename'./output.json'

      fs.writeFile(filename, jsonContent, 'utf8', function(err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        } else {
          var contents = fs.readFileSync(filename);
          var jsonContents = JSON.parse(contents);
          //   //  fileManger.createNewFile(filename);

          res.render('./sentiment_analysis/Result_page_sentiment_analysis', {
            jsonContents: jsonContents,
            query: query
          });
        }
        console.log('JSON file has been saved.');
      });
      // ____________________________________________________________________________________________
    }
  });

  //___________________USE THE SAVED RESULT OF THE LAST QUERY TO WORK WITH IT______________________
  //    var contents = fs.readFileSync('./output.json');
  //    var jsonContents = JSON.parse(contents);
  // //   //  fileManger.createNewFile(filename);

  //   res.render("./sentiment_analysis/Result_page_sentiment_analysis",{jsonContents:jsonContents,query:query});

  // // readJSONFile('./output.json', function (err, json) {
  // //      if(err) { throw err; }
  // //     var jsonContent = JSON.stringify(json, null, 2);

  // //   });
  //  //___________________________________________________________________________________________________
  // res.render("./sentiment_analysis/Result_page_sentiment_analysis",{currentUser:req.user,jsonContent:jsonContent,query:query});
});

//   params.natural_language_query=req.query.data;
// save result query in  databse
router.post('Result_page_sentiment_analysis', function(
  req,
  res,
  results,
  error
) {
  //   //get results from the view
  // var query=req.body.query;
  // var result=req.body.jsonContent;
  // var new_results={query:query,result:result};
  // var query =req.query.data;
  // params.natural_language_query=req.body.data;
  // console.log(params.natural_language_query);
  // discovery.query(params, (error, results,body) => {
  //   if (error) {
  //     console.log(error.body) ;
  //   } else {
  //     //save in the db
  //     var jsonData = results;
  //     console.log(jsonObj);
  //    // stringify JSON Object
  //    var jsonContent = JSON.stringify(results);
  //    res.render("Result_page_sentiment_analysis",{query:query},{jsonContent:jsonContent});
  //   }
  // });
  // result_db.create(new_results,function(err, newlycreated){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log(newlycreated);
  //   }
  //       });
});

// file system module to perform file operations

module.exports = router;
