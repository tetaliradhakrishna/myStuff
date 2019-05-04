
function dateAndTime(){
	let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                return datetime

};

let request = require('request'),
       // local
    //url = 'http://localhost:5984/localtest/',
       // whiznext 
    //url ='http://183.82.148.182:5984/loadtest',
     // ctrl s 
    url = 'http://120.138.9.64:5984/prodtest',
        
    APPLICATION_JSON_HEADER='application/json; charset=utf-8';

    // couch db can access only 4000 requests 

let body_Number = 100000;
let body = [];
loopData();

function loopData(){
    
    // this will generate the data dynamically 
    // for now test going to incrase the data 

   for(var i=0;i<body_Number;i++){
    let body_integrate_length = body.length + 1;
     //console.log(body_integrate_length)

    body.push({
          "campaignName": "test" + body_integrate_length,
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
       });

   }
  // console.log(body)
}



// spliting the Data and storing into the DB using the  throshhold limt 

let total_count = body.length;
let split_threshold = 1000;
let sys_count = 0;
let i = 0,j;
let error_count = 0;
let loop_count = 0;
let stratTime = dateAndTime();
let split_threshold_increment_limt = 0;
// it ittrates whole count 
recursiveLooping(i,split_threshold);
  
  function recursiveLooping(val,split_threshold_limt){

  //console.log("loop value : " + val + '\n' + 'split condition: '+ split_threshold_limt);
  console.log("Strated", dateAndTime());

   for(j=val; j<total_count;j++){
    loop_count = loop_count +1;
  

    if(loop_count  == split_threshold_limt ){
      console.log('loop braked ',loop_count);
      store(body[j]);
      break;
            
     }else{
      //console.log( 'until loop br store the Data ' ,loop_count);
      store(body[j]);
     }
           
     if(loop_count == total_count){
       console.log("loop ended", dateAndTime());
     }
  }
}

// now split the data in to 1000 and store  in the DB 

 function store(store_val){

  request( {
        uri: url ,
        method: 'POST',
        headers: APPLICATION_JSON_HEADER,
        json:store_val
      },
      function ( error, response, body ) {

        if ( error ) { error_count = error_count + 1;
                  console.log("balance_upload_cout", error);
                  //setTimeout(myFunc, 3000, error);
  
          if( total_count == (sys_count + error_count)){
            
            let reupload = sys_count - error_count; 
            console.log('so far uploaded count',sys_count);
            console.log('Not uploaded Count',error_count);
            console.log("balance_upload_cout", reupload);
            
            recursiveLooping(sys_count,split_threshold);
          
          }else{
            console.log('error',error);
            console.log('response',response);
            console.log('body',body);
            
          } } 
        else{
     
        if(response.statusCode == 201){
          sys_count = sys_count + 1;
          
          
          split_threshold_increment_limt = (split_threshold_increment_limt == 0)? split_threshold :split_threshold_increment_limt;
          //console.log(' storing_split_threshold_increment_limt', split_threshold_increment_limt);


          if((split_threshold_increment_limt  == sys_count) && (sys_count !== total_count)){
                  console.log( 'storing_count',sys_count );
                  let balance_upload_cout = total_count - sys_count; 
                    //console.log( 'next threshold ', balance_upload_cout);
                    let i = sys_count;
                    //console.log("loop brake ..  ", split_threshold);
                    split_threshold_increment_limt = sys_count  + split_threshold; 
                       
                    //console.log("Next_split_threshold_Data_count " ,split_threshold_increment_limt);
                    recursiveLooping(i,split_threshold_increment_limt);
           }

          if(sys_count == total_count){
            // if match the total records with stored records 
            console.log('total_count ', total_count);
            console.log('start time ' ,stratTime);
            console.log('Success code function satisfied.. ',dateAndTime());

          }

        }
         else{
          // aprt fro the 201
          console.log(response.statusCode);
          //console.log(body);
        }
      }
    });
}

        