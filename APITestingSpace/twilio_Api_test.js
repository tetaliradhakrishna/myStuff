



const accountSid = 'ACea809a245d28a8c85459e9d96241e44c';
const authToken = '1b39a28050c8a9757476336520b1ebf6';
const client = require('twilio')(accountSid, authToken);
var NUMBER ='+918919679610';
var OTP ="1234";
var MESSAGE ="jjsstaff api call";

function twillioAPI( number,otp,message,callback)
{

  console.log("number",number,"otp",otp,"message",message);
 /* client.messages.create({
          body: otp + number,
          to:number,
          from: '+18446112182'
         },
        function(error, message){
          if(!error)
          {
            console.log( 'Message sent successfully');
          }
          else
          {
            console.log( 'Some error while sending message: ' + error);
          }
        })*/

}

