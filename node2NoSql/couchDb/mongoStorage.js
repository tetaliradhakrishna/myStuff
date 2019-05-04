let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

let total_count = 1000;
let sys_count = 0;
let i = 0;
let error_count = 0;
let loop_count = 0;
let stratTime = dateAndTime();

let body = {

	        "campaignName": "test23333",
              "number": [
                    "9908765554",
                    "9866690011",
                    "9676999535"
                     ],
          "createdDate": "01/1/2019 @ 12:37:15",
          "status": "notOpened",
          "owner": "radhakrishna@whiznext.com",
          "contact": "balstSMS",
          "date": 20190115
       }

function dateAndTime(){
	let currentdate = new Date();
    let datetime =    currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                return datetime

};
recursiveLooping(i)

 function recursiveLooping(val){

  console.log("recalling" + val );
  console.log("Strated", dateAndTime());
  
  for(i=val;i<total_count;i++){
  	loop_count = loop_count + 1;
  	storage();
  }
}



function storage(){

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = body;
  dbo.collection("loadtest").insertOne(myobj, function(err, res,status) {
    if (err) throw err;
    console.log("res",res.result);
      sys_count = sys_count +1;
    db.close();

  });
}); 


    if(total_count === sys_count){
       console.log("end TIme", dateAndTime());

    }

}