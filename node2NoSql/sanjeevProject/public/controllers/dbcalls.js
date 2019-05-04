
var request = require('request');


module.exports={
storeAuraData:function(data,callback){
	request({
    	 uri:'http://localhost:5984/aura',
    	 method:'POST',
    	 json:data
    },function(err,res){
      if(err){
      	throw err;
      	callback(null,err)
      }
      else{
          callback(null,res);    
      	 }
    })

},
 getAllRecords:function(callback){
 
    request({
        uri : 'http://localhost:5984/aura/_design/auraDesignDoc/_view/aura',
        method : 'GET'
    }, function(error, response, body) {
        
        if (error) {
            callback(null,error);
        }
      
        callback(null,body);

    });


}

 




}