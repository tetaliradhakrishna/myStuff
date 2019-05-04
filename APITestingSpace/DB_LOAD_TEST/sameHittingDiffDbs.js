var request = require('request');


let ssl_prod_db ='https://9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix:39e76cbc5819de230426f48f415e24c34c077454d2659779db67eb4bbbe73e80@9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix.cloudant.com';
let whiznext ='https://9c679740-e73b-43cc-b2f1-497f2ff600a0-bluemix:443f4f337f57df92dd78166d23ee6de0f2e0aa1bf1a5fb9fd3baeda01c441441@9c679740-e73b-43cc-b2f1-497f2ff600a0-bluemix.cloudantnosqldb.appdomain.cloud';
let ssl_satge ='https://b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix:1608654b2b689dc443f285e14a37f7397cac1e6815b8a1704075a5d107e24a94@b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix.cloudant.com';


getAndStoreDiffDbsSameTime(ssl_prod_db + '/logins/');
getAndStoreDiffDbsSameTime(whiznext + '/cfs/');
getAndStoreDiffDbsSameTime(ssl_satge + '/portmaster/');
      
let APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';

    // Asynchronous  calls                 
                         
function getAndStoreDiffDbsSameTime(url){
   
   request({
              uri:url,
              method: 'POST',
              headers: APPLICATION_JSON_HEADER,
              json:{'hello':'hited'}
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