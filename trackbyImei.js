var server = require ('tk102');
 
// start server
server.createServer ({
  port: 1337
});
 
// incoming data, i.e. update a map
server.on ('', function (gps) {
  updateMap (gps.geo.latitude, gps.geo.longitude);
});

 function updateMap(val1, val2){
   console.log(val1,val2);
 }