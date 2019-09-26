var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var request = require('request');
result_db = require('../models/result');
// Counter = require('../models/counter');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });
const fs = require('fs');
const parseJson = require('parse-json');
var fileManger = require('../middleware/fileManager');

// function getRoute(req) {
//   const route = req.route ? req.route.path : ''; // check if the handler exist
//   const baseUrl = req.baseUrl ? req.baseUrl : ''; // adding the base url if the handler is a child of another handler

//   return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route';
// }

// router.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log(`${req.method} ${getRoute(req)} ${res.statusCode}`);
//   });
//   next();
// });
var today = new Date();
var date =
  today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
var today = new Date();
var time =
  today.getHours() + 'h' + today.getMinutes() + 's' + today.getSeconds();

var obj = { previouscount: 0, currentcounter: 0, date: '' };
var count = 0;
//@route GET /search_mask_sentiment_analysis
//@desc  GET the search mask for the sentiment analysis
//@acces Public
router.get('/search_mask_sentiment_analysis', function(req, res) {
  console.log('you are in search mask');
  var oldcounts = JSON.parse(fs.readFileSync('./counter.json'));
  res.render('./sentiment_analysis/search_mask_sentiment_analysis', {
    currentUser: req.user,
    count: oldcounts.previouscount,
    date: oldcounts.date
  });
});

//@route GET Result_page_sentiment_analysis
//@desc  GET theResult_page_sentiment_analysis
//@acces Public
router.get('/Result_page_sentiment_analysis', function(req, res) {
  var query = req.query.data;
  console.log('Your query is : ' + query, 'count is', req.query.count);

  var params = {
    environment_id: 'system',
    collection_id: 'news-en',
    // // configuration_id: '',
    // // natural_language_query: req.query.data
    query: req.query.data,
    count: req.query.count, //parseInt(req.body.input.count
    // return: 'title,url,host,crawl_date',
    aggregations: req.query.aggregation //'enriched_text.keywords.sentiment.label'
  };
  // __________discovery.query starts________________________________________
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
      //@desc Thease variables are a counter for ibm discovery.query
      //@accec public
      var oldcounts = JSON.parse(fs.readFileSync('./counter.json'));
      console.log('Old Counts------>', oldcounts);
      obj.previouscount = oldcounts.previouscount + 1;
      obj.currentcounter = count + 1;
      obj.date = date;

      console.log(
        'currentcounter= ',
        obj.currentcounter,
        'previouscount',
        obj.previouscount,
        'Time',
        obj.date
      );
      fs.writeFileSync('./counter.json', JSON.stringify(obj));

      //    // to save the output in different json with current time and date

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

      // //     // ___________________SAVE RESULT OF QUERY AS JSON FILE______________________
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
            query: query,
            count: oldcounts.previouscount,
            date: oldcounts.date
          });
        }
        console.log('JSON file has been saved.');
      });
      // ____________________________________________________________________________________________
    }
  });
  // __________discovery.query ends_________________________________________________________________________

  //___________________USE THE SAVED RESULT OF THE LAST QUERY TO WORK WITH IT______________________
  // var contents = fs.readFileSync('./output.json');
  // var jsonContents = JSON.parse(contents);
  // //   //  fileManger.createNewFile(filename);
  // try {
  //   console.log(JSON.stringify(jsonContents.results.enriched_text, null, 2));
  // } catch (error) {
  //   console.log(error);
  // }

  // res.render('./sentiment_analysis/Result_page_sentiment_analysis', {
  //   jsonContents: jsonContents,
  //   query: query
  // });

  // readJSONFile('./output.json', function(err, json) {
  //   if (err) {
  //     throw err;
  //   }
  //   var jsonContent = JSON.stringify(json, null, 2);
  // });
  //___________________________________________________________________________________________________
  // res.render('./sentiment_analysis/Result_page_sentiment_analysis', {
  //   currentUser: req.user,
  //   jsonContent: jsonContent,
  //   query: query
  // });
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
