
var request = require('request');
var fs  =   require('fs');
 var Base64Decode = require('base64-stream').decode;

  

    var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8; image/*';


    // This key belongs to whiznext
    var SENDGRID_API_KEY = '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';
    var WHIZNEXT_SENDGRID_MAIL_API = 'https://api.sendgrid.com/v3/mail/send';

    var TO_EMAIL = 'radhakrishna@whiznext.com'; // reach mail
    var FROM_EMAIL ='radha784578@gmail.com'; // from to to reach 
    var SUBJECT = 'attachments';

    var baseToString =  image.toString();  
   

    var spltingBaseToUrl = baseToString.split("base64,")[1];
     var imgFile = new Base64Decode(spltingBaseToUrl);
      
   /*  console.log(finalRequest);*/

    var headerValues = {
               'Content-Type': APPLICATION_JSON_HEADER ,
               'Authorization': 'Bearer ' + SENDGRID_API_KEY

        };
           
        var data = {
                    'personalizations': [{
                            'to': [{'email': TO_EMAIL}]
                        }],
                        'from': {'email': FROM_EMAIL},
                        'subject': SUBJECT,
                         'html': '<p>Here’s an attachment for you!</p>',
                         'attachments': [
                                     {
                                      'content': "How are you ?",
                                      'filename': 'abcd.txt',
                                     'type': 'text/plain',
                                     'disposition': 'attachment',
                                     },
                        ],
                       
			         };

                     console.log(data);

        request(
                {
                    uri: WHIZNEXT_SENDGRID_MAIL_API,
                    method: 'POST',
                    headers: headerValues,
                    json: data

                }, 
                function(error, response, body) 
                {
                    if(error)
                    {
                        console.log('Internal Error occurred to send mail: ' + error);
                        //callback(error);
                    }

                    console.log( '--Return Code : ' + response.statusCode);
                    if( response.statusCode != 202 )
                    {
                        console.log( 'Failed to send email: ' + response.statusCode);
                       //callback(null, response);
                    }
                    else
                    {
                        console.log( 'Successfully sent email');
                        //callback(null, response);
                    }
                    
                }
            );
