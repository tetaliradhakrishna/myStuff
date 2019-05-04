
var request = require('request');
// https://reimbursement-api.mybluemix.net/reimbursement/v1/jjsGetAllLoginDetails/


var compData,ret,data;   
var lgoinData =[];
dataLoad();

function dataLoad(){
 var APPLICATION_JSON_HEADER = 'application/json; charset=utf-8;  images/* ; base64';
                var headerValues = {
                            'Content-Type': APPLICATION_JSON_HEADER
                                    };
                var url ='https://whiznextapi.mybluemix.net/reimbursement/v1/jjsGetAllLoginDetails/'; 
                
                request({
                        uri: url,
                        method: "GET",
                        headers:APPLICATION_JSON_HEADER

                        },
               function(error, response, body) 
                {
                  data = JSON.parse(body);
                  console.log("GOT THE DATA FROM DB ");
                 }
            )};
module.exports = {

	authenticateemployeelogin: function(username, password, callback){
      
                //console.log('datafrom angulr ',username,password);
               
                 for(var i =0;i<data.length-1;i++){

                      if(username === data[i].userid && password === data[i].passWord ){
                        ret ='0';
                        //console.log('inside the db file ');
                        callback(null,ret);
                        break;
                      }
                      else if(username !== data[i].userid && password !== data[i].passWord){
                        ret = '-1';
                        console.log('rejected');
                        //callback(null,ret);
                        break;
                      }
                      
                 }       
                }


};