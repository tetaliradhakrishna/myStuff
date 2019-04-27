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

app.post('/cal', (req, res) => {
  //console.log(req.body);


  let bondedDate = moment(req.body.bondDate, "YYYY-MM-DD");
  let billedDate = moment(req.body.billDate, "YYYY-MM-DD");
  // bill amount nothing but  s
  let ONE_SQM_PRICE = req.body.billAmount;
  let noOfContainers = req.body.noOfContainers;
  let size = req.body.size;


  //Difference in number of days
  let DIFF_BW_DATES = -(moment.duration(bondedDate.diff(billedDate)).asDays())
  // count the how many weeks ...b/w date
  let NO_OF_WEEKS = DIFF_BW_DATES / 7;  

  let UNBILLED_WEEKS = Math.ceil((NO_OF_WEEKS >= 4) ? NO_OF_WEEKS - 4 : 0);

  let NO_SQM = noOfContainers * size;
  let FIRST_WEEK_BILLED_AMOUNT = 1 * NO_SQM * ONE_SQM_PRICE
  let FIRST_4_WEEKS_BIILED_AMOUT = 4 * NO_SQM * ONE_SQM_PRICE;

  // this cal will give if data is the more the 4 weeks will cal total weeks if not will bill first 4 weeks 
  let TOTAL_BILL = (Math.ceil((NO_OF_WEEKS >= 4))) ? Math.ceil(NO_OF_WEEKS) * NO_SQM * ONE_SQM_PRICE : FIRST_4_WEEKS_BIILED_AMOUT ;
  
  console.log("NO_SQM",NO_SQM);
  console.log("FIRST_WEEK_BILLED_AMOUNT",FIRST_WEEK_BILLED_AMOUNT);
  console.log("FIRST_4_WEEKS_BIILED_AMOUT",FIRST_4_WEEKS_BIILED_AMOUT);


  res.status(200).send({
    bonded: bondedDate,
    billed: billedDate,
    diffDays: DIFF_BW_DATES,
    roundedNoOfWeeks: Math.ceil(NO_OF_WEEKS),
    ubbilledweeks: UNBILLED_WEEKS,
    roundedperweekAmount:FIRST_WEEK_BILLED_AMOUNT,
    fourWeeks:Math.round(FIRST_4_WEEKS_BIILED_AMOUT),
    areaInSq:NO_SQM,
    totalBill:TOTAL_BILL


  })
  res.end();
})




app.get('/', (req, res) => {
  res.sendfile('index.html');
})

