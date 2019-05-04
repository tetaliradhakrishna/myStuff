let CLOUDANT_HOST_SSL_PROD = process.env.CLOUDANT_HOST_SSL_PROD;
     //console.log("process",CLOUDANT_HOST_SSL_PROD);
let page_result = 10;
let skip_rows = 5;
let url =  CLOUDANT_HOST_SSL_PROD + '/sslwarehouse/'  + '_design/sslDesignDoc/_search/byClientName?include_docs=true';
		
    // work on this procees for pagination and queies
    // integrated limit option  based on the  given number records will be fetch
    // what is skip  
    url = url + '&query=client:\"' + process.env.CLIENT_NAME + '\"' 
              + '&skip=' + skip_rows 
              + '&limit=' + page_result;

let http = require('request');
   basedOnthePagenation();


   function basedOnthePagenation(){
      
       http({
       	   uri:url,
           method:'GET',    
           headers: 'Content-Type: application/json,charset:utf8'
       },(err,res,body)=>{
                if(err){
                	console.log(err);
                }
                let pusded_Date = [];
                console.log('Res',res.statusCode);
                console.log('Total_Rows',JSON.parse(body).total_rows);
                console.log('Book_Mark',JSON.parse(body).bookmark);
                console.log('BODY_LIMIT_LENGTH',JSON.parse(body).rows.length);
                
                for(let i=0;i<JSON.parse(body).rows.length;i++){
                    pusded_Date.push(JSON.parse(body).rows[i].doc);
                }
               console.log('pusded_Data',pusded_Date[0]);
       })
   
   };                        