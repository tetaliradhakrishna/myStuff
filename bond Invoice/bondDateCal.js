let moment = require('moment');
let express = require('express');
let app = express();
let cors = require('cors');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');

var appEnv = cfenv.getAppEnv();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json()); // To read the body passed in JSON

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept,Company-Name');
  next();
});
app.use(cors());

// https://javascript.info/number 
// number Rounding  

// let BOND_DATE = 20190410;
// let WEEK_COUNT_DATE = 20190509;




app.listen(8888, '0.0.0.0', function () { //to run locally

    //app.listen(3000, 'localhost', function() { //to run locally
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
    
  });

app.post('/cal',(req,res)=>{
 //console.log(req.body);


 let bondedDate = moment(req.body.bondDate, "YYYY-MM-DD");
 let billedDate = moment(req.body.billDate,"YYYY-MM-DD")


//Difference in number of days
let DIFF_BW_DATES = -(moment.duration(bondedDate.diff(billedDate)).asDays())

// count the how many weeks ...b/w date
let NO_OF_WEEKS = DIFF_BW_DATES/7;
let UNBILLED_WEEKS = Math.ceil((NO_OF_WEEKS >= 4 ) ? NO_OF_WEEKS - 4 : 0);

// console.log( 'DIff Days ', DIFF_BW_DATES);
// console.log( 'NO of Weeks ',NO_OF_WEEKS);
// console.log( 'unBilled Weeks ', UNBILLED_WEEKS); 

res.status(200).send({bonded:bondedDate,
                      billed:billedDate,
                      diffDays:DIFF_BW_DATES,
                      noOfWeeks:NO_OF_WEEKS,
                      roundedNoOfWeeks:Math.ceil(NO_OF_WEEKS),
                      ubbilledweeks:UNBILLED_WEEKS})
res.end();
})




app.get('/' ,(req,res)=>{
  res.sendfile('index.html');
})

