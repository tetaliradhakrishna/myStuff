var request = require('request');
const fs = require('fs');

console.log('inside the sendmail.js function')
var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';

// This key belongs to  tetaliradhakrishna
var SENDGRID_API_KEY = process.env.SENDGRID_API;
var WHIZNEXT_SENDGRID_MAIL_API = 'https://api.sendgrid.com/v3/mail/send';

//  var email='SSL@whiznext.com';
var FROM_EMAIL = 'radha784578@gmai.com'; // from 
var REACHUS_EMAIL_TWO = 'tetaliradhakrishna@gmail.com'; // to mail
// radhakrishna@whiznext.com

var headerValues = {
  'Content-Type': APPLICATION_JSON_HEADER,
  'Authorization': 'Bearer ' + SENDGRID_API_KEY
};

let base64data = encrypt('./One.xlsx');
function encrypt(file) {

  var bitmap = fs.readFileSync(file);
  const encrypted = new Buffer(bitmap).toString("base64");
  return encrypted;
};

const file_name = " one.xlsx"

var data = {
  'personalizations': [{
    'to': [{
      'email': REACHUS_EMAIL_TWO
    }]
  }],
  'from': {
    'email': FROM_EMAIL

  },
  'subject': "hey there ",
  'content': [{
    'type': 'text/html',
    'value': "<h1>radhakrishna test</h1>",
  }],
  "attachments": [{
    "content": base64data,
    "filename": file_name
  }]
};



//console.log(data);
request(
  {
    uri: WHIZNEXT_SENDGRID_MAIL_API,
    method: 'POST',
    headers: headerValues,
    json: data

  },
  function (error, response, body) {
    if (error) {
      console.log('Internal Error occurred to send mail: ' + error);
      // callback(error);
    }

    console.log('--Return Code : ' + response.statusCode);
    if (response.statusCode != 202) {
      console.log('Failed to send email: ' + response.statusCode);
      //callback(null, response);
    }
    else {
      console.log('Successfully sent email');
      //callback(null, response);
    }

  }
);

