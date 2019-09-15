/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for mongo DB
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

// mongo connection 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://18.217.244.18:27017/mydb";


// Connecting DB with Mongoose.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// insert operation 
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "radhakrishna IncPla", address: "node developer 37" };
//   dbo.collection("customers").insert(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// get operation  
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var cursor = dbo.collection("customers").find();

// Execute the each command, triggers for each document
cursor.each(function(err, item) {

    // If the item is null then the cursor is exhausted/empty and closed
    if(item == null) {
        db.close(); // you may not want to close the DB if you have more code....
        return;
        console.log("NO RECORDS FOUND");
    }
    else{
    	console.log(item)

    }
    // otherwise, do something with the item
});
});*/

// update 

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // this is the  existing name feild  
  var myquery = { name: "radhakrishna Inc" };
  // new values passing to the db and updating. 
  var newvalues = { $set: {name: "radhakrishna ", address: "node developer" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});*/


// // delete 
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { address : "node developer 37" };
//   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
//app.listen(3000, 'localhost', function() { //test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});





