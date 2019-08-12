var request = require('request');
var SSL_LOGISTICS_CLOUDANT_HOST = 'https://b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix:1608654b2b689dc443f285e14a37f7397cac1e6815b8a1704075a5d107e24a94@b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix.cloudant.com';
var DELIVERY_CHALLAN_DATABASE = '/deliverychallan/';
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8',
startdate = 20180101,
enddate= 20180701,
clientName ="con"; 
var url = SSL_LOGISTICS_CLOUDANT_HOST + DELIVERY_CHALLAN_DATABASE +
              '_design/sslDesignDoc/_search/dcrecordsByClientAndDateRange?query=dateRange:[' + startdate + ' TO ' + enddate + ']&include_docs=true';



queryDb( url, function(err, data){

    console.log( 'DATA RETURNED: ' + data);

});

function queryDb( url, callback)
{
   
  console.log( url);
   request( {
        uri: url,
        method: 'GET',
        headers: APPLICATION_JSON_HEADER
      },
      function ( error, response, body ) {
        if ( error ) {
          console.log(
            'Failed to get the logistics records for clientName and dateRange ' +
            url );
          console.log( error );
          callback( error );
        }

        
        callback( null, body );
      



      }
    );
}

