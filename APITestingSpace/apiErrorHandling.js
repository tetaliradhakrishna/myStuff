

  var WHIZNEXT_CLIENT_ID ="12345";
  var WHIZNEXT_SECERT_ID ="wh123";


var request = require('request');
var sleep = require('system-sleep');
var fs = require('fs');

// for error handling npm is also there 
//https://www.npmjs.com/package/http-errors

// Prod DB URL & and also given in the env variable in system. 
var SSL_LOGISTICS_CLOUDANT_HOST = 'https://9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix:39e76cbc5819de230426f48f415e24c34c077454d2659779db67eb4bbbe73e80@9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix.cloudant.com';
var LOGISTICS_LR_DATABASE = '/logistics/';
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';


var url = 




SSL_LOGISTICS_CLOUDANT_HOST + LOGISTICS_LR_DATABASE +
          '_design/logisticsDesign/_search/logisticsRecordsByType?query=logisticsType:\"Import\"&include_docs=true';

queryDocumentsNoDocs( url,url,function(err, returnData){

    console.log( 'DATA RETURNED: ' , returnData);

});


var allRowsNoDocs = []; 
function queryDocumentsNoDocs( url, baseUrl, callback)
{  
	console.log("function hited");
 
   request( {
        uri: url,
        method: 'GET',
        headers: APPLICATION_JSON_HEADER,       
      },
      function ( error, response, body ) {

       // error          
        try{
             var jsonBody =  JSON.parse(body);
             //console.log("----try " ,jsonBody);
             //console.log("JSON PARSE STATUS CODE: ", response.statusCode);
             //console.log("JSON PARSE STATUS MESSAGE: " , response.statusMessage);
             
             if(jsonBody){
             	
                 throw err;
             }
            
        } 
        catch (err){
        	
        	 if(response.statusCode === 404){
        	 	
        	 	console.log("JSON PARSE ERROR 404",jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	
        	 }
        	else if(response.statusCode === 401){
        	 	console.log("JSON PARSE ERROR 401" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	

        	 }
        	 else if(response.statusCode === 403){
        	 	console.log("JSON PARSE ERROR 403" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	
        	 }
        	 else if(response.statusCode === 502){
        	 	console.log("JSON PARSE ERROR 502" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	

        	 }
        	else if(response.statusCode === 501){
        	 	console.log("JSON PARSE ERROR 501" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	

        	 }
        	  else if(response.statusCode === 429){
        	 	console.log("JSON PARSE ERROR 429" ,jsonBody.error);
             	console.log("JSON PARSE ERROR MESSAGE",jsonBody.reason);
             	
        	 }
        	 else{
        	 	successOnly();

        	 }


        	   /*console.log(" ----URL:" , baseUrl);
               console.log("---- BODY: " , body);*/
               
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


function buildReturnJson( body, response ) {
  var toReturn = {
    "body": body,
    "statusCode": response.statusCode,
    "statusMessage": response.statusMessage
  };
  return toReturn;
}


