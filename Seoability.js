var request = require('request');
var API_KEY ='dsmflku5498327432432';
var SEO_CHECK_API = 'http://www.whiznext.com/'
var URL = "https://api.seobility.net/en/resellerapi/addproject?apikey="+ API_KEY  +"+&url=" + SEO_CHECK_API;

var URL_ONE = "https://api.seobility.net/en/resellerapi/deleteproject?apikey="+ API_KEY +"&id=120933" ;

request(URL_ONE, function (error, response, body) {

            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
});