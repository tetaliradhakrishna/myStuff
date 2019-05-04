


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

  var URL = 'http://120.138.9.64:5984/whiznext/_all_docs';
    console.log('start time', datetime);
  request({
    uri: URL,
    method: 'GET'
  }, function (error, response, body) {
    if (error) {
      console.log(error);
    }else{
 
       

       var rows = [];
		if (error) {
			console.log(error);
		}

		var rowsObject = JSON.parse(body);
		//console.log(rowsObject)

		for (var i = 0; i < rowsObject.rows.length; i++) {
			

				rows.push(rowsObject.rows[i].doc);
			

}
console.log('END time', datetime);
    console.log(rows);
 
     
    }
    
  });

  
