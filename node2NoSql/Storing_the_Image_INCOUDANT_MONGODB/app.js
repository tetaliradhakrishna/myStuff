/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var bodyParser = require('body-parser');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
  //res.header("limit: 530699");
  next();;
});


//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(bodyParser.json());




const nodemailer = require("nodemailer");
//var continerMail = require('./public/controllers/sendmail.js');

var request = require('request');




app.post('/imageData',function(req,res){

         //console.log("app.js"); 
         //console.log(req.body);

          var url =  " http://localhost:3000/electrical/v1/stroreRecord";
         var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';
   request({
              uri:url,
              method: 'POST',
              headers: APPLICATION_JSON_HEADER,
              json:req.body
          },
          function(error, response, body)
          {
             
              if(error)
              {
                 console.log('Failed to get all documents from' + url);
                 console.error(error);
                  
              }
               else{
                  //console.log(url);
                  console.log(response.statusCode);
                  console.log(response.statusMessage);
                  console.log(body);
               }  

          });
     
 
});



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
//app.listen(3000, 'localhost', function() { //test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


