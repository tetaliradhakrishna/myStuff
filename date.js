let cron = require('cron').CronJob; 
let currentdate = new Date();
//https://www.npmjs.com/package/cron
function dateAndTime(){
    let datetime = currentdate.getDate() + "/" +
      (currentdate.getMonth() + 1) + "/" +
      currentdate.getFullYear() + " @ " +
      currentdate.getHours() + ":" +
      currentdate.getMinutes() + ":" +
      currentdate.getSeconds();  
       
      return datetime;
   };

   console.log('start', dateAndTime())
   // sec,min,hrs,dayOfthemonth,month,day
var everyYearMarchMidnight = new cron('* * * * *', function() {
    /*
     * Runs every Year march 31
     * at 00:00:00 AM. 
     */
    console.log('end', dateAndTime())
    }, function () {
      
     
    },
    true /* Start the job right now */
  );

   