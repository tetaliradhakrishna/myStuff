var request = require('request');
var sleep = require('system-sleep');
var fs = require('fs');


// Prod DB URL & and also given in the env variable in system. 
//var SSL_LOGISTICS_CLOUDANT_HOST = 'https://9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix:39e76cbc5819de230426f48f415e24c34c077454d2659779db67eb4bbbe73e80@9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix.cloudant.com';

var SSL_LOGISTICS_CLOUDANT_HOST = 'https://b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix:1608654b2b689dc443f285e14a37f7397cac1e6815b8a1704075a5d107e24a94@b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix.cloudant.com'
var LOGISTICS_LR_DATABASE = '/logistics/';
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';


var url = SSL_LOGISTICS_CLOUDANT_HOST + LOGISTICS_LR_DATABASE +
      
      '_design/logisticsDesign/_search/logisticsRecordsByType?query=logisticsType:\"Import\"&include_docs=true';

queryDocumentsNoDocs( url,url,function(err, returnData){

    console.log( 'DATA RETURNED: ' + returnData);

});


var allRowsNoDocs = []; 
function queryDocumentsNoDocs( url, baseUrl, callback)
{  
   request( {
        uri: url,
        method: 'GET',
        headers: APPLICATION_JSON_HEADER,       
      },
      function ( error, response, body ) {

      
       // error 
        if ( error ) {
          console.log('Failed to get the logistics records for clientName and dateRange ' + url );
          console.log( error );
          callback( error );
        }
         
        try{
             
             var jsonBody =  JSON.parse(body);
      

        } catch (err){
        	   console.log(" ----URL:" + baseUrl);
             console.log("---- BODY: " + body);	   
             console.log("-----ERROR: " + err);

        }
           
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
      
              //console.log("totalRecords",jsonBody.total_rows);
              queryDocumentsNoDocs(newUrl,baseUrl, callback);
              console.log("pushedData ....... " + allRowsNoDocs.length );
              /*console.log(" ----URL:" + baseUrl); 
              console.log("BOOKMARK ..........." + bookmark );
              console.log("FORMED URL " + newUrl);*/ 

        }
        else {
                   
               callback( null,buildReturnJson(allRowsNoDocs, response));

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


