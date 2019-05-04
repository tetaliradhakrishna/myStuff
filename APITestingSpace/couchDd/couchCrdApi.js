var http = require('request');
var sleep = require('system-sleep');
var fs = require('fs');


var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';
var SELECTOR  = {
  "selector": {
    "name": {
      "$eq": 'whiznext'
    }
  }
};


var url = 'http://120.138.9.64:5984/' + 'analytics' +'/_find'; 

queryDocumentsNoDocs( url,url,function(err, returnData){

    console.log( 'DATA RETURNED: ' , returnData);

});


var allRowsNoDocs = []; 
function queryDocumentsNoDocs( url, baseUrl, callback)
{  

 
   http( {
        uri: url,
        method: 'POST',
        headers: APPLICATION_JSON_HEADER,
        json:SELECTOR       
      },
      function ( error, response, body ) {

       // error          
        try{
             var jsonBody =  JSON.parse(body);
             console.log("----try " ,jsonBody);
             //console.log("JSON PARSE STATUS CODE: ", response.statusCode);
             //console.log("JSON PARSE STATUS MESSAGE: " , response.statusMessage);
             
             if(jsonBody){
             	
                 throw err;
             }
            
        } 
        catch (err){

        	console.log(response.statusCode);
        	 if(response.statusCode === 404){
        	 	
        	 	console.log("JSON PARSE ERROR" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	
        	 }
        	  else if(response.statusCode === 400){
        	 	console.log("JSON PARSE ERROR" ,body);
             	
        	 }
        	 else{
        	 	//successOnly();
        	 	 console.log(" ----URL:" , baseUrl);
                 console.log("---- BODY: " , body.bookmark);
                 console.log("---- LENGTH OF DOCS: " , body.docs.length);
                 
                  hit2ndTime(baseUrl,body.bookmark);
        	 }


               
               
        }
         function hit2ndTime(url,bookmark){
         	var newUrl = url + '&bookmark=' + bookmark;
         	  console.log(newUrl);
         	      queryDocumentsNoDocs(newUrl,baseUrl, callback);

          }

function buildReturnJson( body, response ) {
  var toReturn = {
    "body": body,
    "statusCode": response.statusCode,
    "statusMessage": response.statusMessage
  };
  return toReturn;
}


     function successOnly(){
        for ( var i=0; i < jsonBody.rows.length; i++)
        {
        
          if ( !( jsonBody.rows[ i ].doc._id.includes( "_design" ) ) ) {
      
                allRowsNoDocs.push(jsonBody.rows[i].doc); // first 25               
           }
        }
      

        if ( jsonBody.total_rows > 25 && jsonBody.rows.length > 0 )
        {
           // recrsive loop 
          // Loop
          var bookmark = jsonBody.bookmark;
          var newUrl = baseUrl + '&bookmark=' + bookmark;
              queryDocumentsNoDocs(newUrl,baseUrl, callback);
        }
        else {
               callback( null,buildReturnJson(allRowsNoDocs, response));
        }
    }

      })
    
}