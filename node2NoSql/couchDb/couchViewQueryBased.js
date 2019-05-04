var request = require('request');


   let url = 'http://120.138.9.64:5984/whiznext/_design/esignup/_view/test?include_docs=true' 

   + 'key="radhakrishna@whiznext.com" AND endkey=[' + 20190101+ 'TO' + 20190131 + ']' ;
   //+ '&startkey=' + 20190101 + 'endkey=' + 20190131 +  ;
   console.log(url);   
    let APPLICATION_JSON_HEADER='application/json; charset=utf-8';

	request( {
        uri: url ,
        method: 'GET',
        headers: APPLICATION_JSON_HEADER,
      },
      function ( error, response, body ) {
        if ( error ) {
         console.log("error",error);
        }
        
        
        if(response.statusCode !== [400,404] ){
          console.log('res',response.statusCode);
          console.log(body);
          

        }
        else{
          parseBody = JSON.parse(body)
           console.log('res',parseBody.total_rows);
           console.log('res',parseBody.rows.length);

        }
       
      
});


     
    
