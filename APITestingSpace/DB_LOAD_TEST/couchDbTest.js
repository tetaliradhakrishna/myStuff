var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


                //console.log(datetime);  
var request = require('request');
var keys_data = [];

  var URL = 'http://120.138.9.64:5984/whiznext/_design/esignup/_view/alldocs';
    console.log('start time', datetime);
  request({
    uri: URL,
    method: 'GET'
  }, function (error, response, body) {
    if (error) {
      console.log(error);
    }else{
     // console.log(body);
      var JSON_BOdY = JSON.parse(body);
   
      console.log(JSON_BOdY.total_rows)
      //console.log(JSON_BOdY.rows);

      for(var i=0;i<JSON_BOdY.rows.length;i++){

        //console.log(JSON_BOdY.rows[i].key)
       // if(JSON_BOdY.rows[i].key.ContactbelongsTo == "radhakrishna@whiznext.com"){
   
         
          keys_data.push(JSON_BOdY.rows[i].key)
          
          
        //}
      }
       console.log('END time', datetime);
      console.log(keys_data);
     
    }
    
  });

  
