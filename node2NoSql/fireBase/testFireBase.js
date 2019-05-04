let request = require('request');
         




         let url =  " https://test-54b26.firebaseio.com/";
         let APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';
   

   request({
              uri:url,
              method: 'POST',
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
                  console.log(response.statusCode);
                  console.log(response.statusMessage);
                  console.log(body);
               }  

          });
     