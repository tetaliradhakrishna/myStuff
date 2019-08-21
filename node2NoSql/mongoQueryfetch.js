var express = require('express');
var cfenv = require('cfenv');
var app = express();
var appEnv = cfenv.getAppEnv();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/afts";

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(bodyParser.json());



// upload
let increase = 0;
for (let i = 0; i < 3000; i++) {
    //increase = increase + 1;
    //console.log(increase);
    //insertData();
}
function insertData() {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("afts");
        var myobj = { date: 20190814,
            test: 'hey there',
            type: 'upload',
            increaseNumber: increase
          };
        dbo.collection("ap24x7").insert(myobj, function (err, res) {
            if (err) throw err;
            console.log(  increase + "document inserted");  
            db.close();
        });
    });
}

// Fetch 
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("afts");
    dbo.collection("ap24x7").find({ date: 20190814 ,type:"test"}).toArray(function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results); // output all records
        db.close();
    });

});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    //app.listen(3000, 'localhost', function() { //test locally
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});





