var request = require('request');
var sleep = require('system-sleep');
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var RateLimit = require('express-rate-limit');


var app = express();



var URL_ONE   = " http://localhost:3000/electrical/v1/getAll";


 // Asynchronous  calls 
        
    
var loop = 1000;
var hittingCount = 1;
var increasingCount;

for( var i = 0;i<loop;i++){
     increasingCount = hittingCount++;
     urlOne();

}
        
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';

                   
                    function urlOne()
                    {
                     getAllDocsFromDiffDatabase(URL_ONE);
                    };
                   


 
function getAllDocsFromDiffDatabase(url){
          

  console.log("HITTED" +  increasingCount);
   request({
              uri:url,
              method: 'GET',
              headers: APPLICATION_JSON_HEADER
          },
          function(error, response, body)
          {
             
              if(error)
              {
                 console.log('Failed to get all documents from' + url);
                 console.error(error);
                  
              }
               else{
                  //console.log(url);
                  //console.log(response.statusCode);
                  console.log(response.statusMessage);
                  //console.log(body);
               }  

          });

}