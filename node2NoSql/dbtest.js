
let http = require('request');


getAllDocs();

function getAllDocs() {

    http({
        uri: 'http://120.138.9.64:6003/ssl-logistics/v1/getSlotData?companyName=ssl',
        method: 'GET',
    }, function (error, response, body) {

         let datat = JSON.parse(body)
    });
}