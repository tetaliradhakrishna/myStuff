var request = require('request'),
    url = 'http://120.138.9.64:5984/jjs/5f265dcb49b6a2d6addc3837eaf4b325',
    APPLICATION_JSON_HEADER='application/json; charset=utf-8',
    body ={
  "_id": "5f265dcb49b6a2d6addc3837eaf4b325",
  "_rev": "3-c7901d2673f37a50393d6cb30563d4b8",
  "name":"updated "

}     

     	request( {
        uri: url ,
        method: 'PUT',
        headers: APPLICATION_JSON_HEADER,
        json:body
      },
      function ( error, response, body ) {
        if ( error ) {
         console.log("error",error);
        }else{
        	console.log(response.statusCode);
        	console.log(response.statusMessage);
        }

         
});

