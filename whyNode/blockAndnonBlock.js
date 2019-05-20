/**
 * What is the diff  b/w blocking and non-blocking 
 * Blocking need wait until the thred get the data 
 * NOn-blocking  no need wait for any respose  each one each call (process ) 
 */



 // node js program excuit line by line  (compile and excuite)

 function callOne(){
     console.log("message printed ");
 }
 console.log("excuited ");
 callOne();
 console.log("--------------------------------------------------------------");
 // example blocking 
 var fs = require("fs");
 var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program Ended");
console.log("--------------------------------------------------------------");

// example non-blocking 
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
 });
 
 console.log("Program Ended");
 console.log("--------------------------------------------------------------");


 // event Example 
 /**
  * Concurrency means multiple computations are happening at the same time
  * Event  example is blocking and non block but  show  with  module emmit events
  * by using the internally what happens we can understand 
  * event loop process 
  * Evert quee
  * Event lisiters 
  * event cb 
  * https://alligator.io/nodejs/event-driven-programming/
  */
