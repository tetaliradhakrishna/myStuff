
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

let request = require('request'),
     
    url = 'http://120.138.9.64:5984/prodtest',
        
    APPLICATION_JSON_HEADER='application/json; charset=utf-8';




var body ={
          "campaignName": "test" ,
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
   

   };




// spliting the Data and storing into the DB using the  throshhold limt 

let total_count = 50000;
let split_threshold = 500;
let sys_count = 0;
let i = 0;
let stratTime = dateAndTime();
// it ittrates whole count 
recursiveLooping(i);
  
  function recursiveLooping(val){
  console.log("Strated", dateAndTime());

   for(j=val; j<total_count;j++){
    store(body);
   
 }
};
// now split the data in to 1000 and store  in the DB 

 function store(store_val){

  request( {
        uri: url ,
        method: 'POST',
        headers: APPLICATION_JSON_HEADER,
        json:store_val
      },
      function ( error, response, body ) {

        if ( error ) {} 
        else{
     
        if(response.statusCode == 201){
          sys_count = sys_count + 1;
          console.log(sys_count)


          if(sys_count == total_count){
            // if match the total records with stored records 
            console.log('total_count ', total_count);
            console.log('start time ' ,stratTime);
            console.log('Success code function satisfied.. ',dateAndTime());

          }
        }


          

        
         else{
          // aprt fro the 201
          console.log( 'else' ,response.statusCode);
          //console.log(body);
        }
      }
    });
}

        