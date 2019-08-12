var request = require('request');
var SSL_LOGISTICS_CLOUDANT_HOST = 'https://b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix:1608654b2b689dc443f285e14a37f7397cac1e6815b8a1704075a5d107e24a94@b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix.cloudant.com';
var LOGISTICS_BILLING_DATABASE = '/logisticsbilling/';
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';
var startdate ="20-05-2018", enddate ="20-07-2018";



  var url = SSL_LOGISTICS_CLOUDANT_HOST + 
            LOGISTICS_BILLING_DATABASE + 
            '_design/logisticsDesign/_search/billingRecordsByClientAndDateRange?include_docs=true';
            url = url + '&query=client:\"' + clientName + '\"';

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

