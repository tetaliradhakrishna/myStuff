var request = require('request'),
    url = 'http://localhost:5984/logistics/_find/_all_docs?include_docs=true ',
    APPLICATION_JSON_HEADER='application/json; charset=utf-8';
     var body = {
  "selector": {
    "logisticsData.clientName": {
      "$eq": "DECCAN FINE CHEMICALS (INDIA) PVT LTD"
    }
  }
};

var PouchDB = require('pouchdb');


var pushedData = [];

	request( {
        uri: url ,
        method: 'POST',
        headers: APPLICATION_JSON_HEADER,
        json:body
      },
      function ( error, response, body ) {
        if ( error ) {
         console.log("error",error);
        }

         var pouch = new PouchDB('http://localhost:5984/logistics/');
       
         pouch.allDocs(function (err, response) {
 console.log(response);
});


        console.log(body);
        for ( var i=0;i<body.docs.length ;i++){
          pushedData.push(body.docs[i]);
        }     
        console.log("response",response.statusCode);
        console.log("data",pushedData.length);
      
      }
    );
	
