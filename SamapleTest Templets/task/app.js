
let express = require('express'),
    cfenv = require('cfenv'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

let appEnv = cfenv.getAppEnv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


// api  access 

let url = 'http://www.omdbapi.com/?apiKey=2d2c9886';
// this api key we can get it from ENV Varabiles for more secure 

app.post('/search',(req,res)=>{

   url = url + '&s=' + req.body.searchName + '&y=' + req.body.y + '&type='+req.body.type + '&page=' + req.body.pageCount;
    // asyc call back 
    httpCall((err,result)=>{
      if(err){
            res.send(err);
      }else{
         res.send(result);
      }
      // ending the DB response;
      res.end();

    })

   

});

function httpCall(callback){
  console.log(url);
      
       request({
        uri:url,
        method:'GET'
       },function(err,res,body){
        if(err){
          callback(null,err)
        }else{
         //console.log(res.statusCode);
          //console.log(JSON.parse(body));
          callback(null, {
            statusCode:res.statusCode,
            statusMessage: res.statusMessage,
            body:JSON.parse(body)
          })
        }
       })

}

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});





