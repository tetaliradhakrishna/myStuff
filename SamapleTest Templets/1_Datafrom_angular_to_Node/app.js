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
app.use(bodyParser.urlencoded({
  extended: true
}));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(bodyParser.json());



const accountSid = 'ACea809a245d28a8c85459e9d96241e44c';
const authToken = '1b39a28050c8a9757476336520b1ebf6';
const client = require('twilio')(accountSid, authToken);

app.post( '/otpData', function(req, res){
 console.log(req.body.mobile);
 console.log(req.body.otp);


/*        client.messages.create({
          body:'Use OTP: ' + req.body.otp +' to register with JJS-Staff.' ,
          to:req.body.mobile,
          from: '+18446112182'
        }, function(error, message){
          if(!error)
          {
            console.log( 'Message sent successfully');
          }
          else
          {
            console.log( 'Some error while sending message: ' + error);
          }
}); 
*/
});// post closed



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
//app.listen(3000, 'localhost', function() { //test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


