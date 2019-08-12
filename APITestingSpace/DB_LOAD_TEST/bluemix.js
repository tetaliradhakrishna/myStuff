let http = require('request');
let HOST ='https://b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix:1608654b2b689dc443f285e14a37f7397cac1e6815b8a1704075a5d107e24a94@b357119f-6ba0-4c7f-94d4-b17553f0b486-bluemix.cloudant.com'
let PROD_HOST ='https://9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix:39e76cbc5819de230426f48f415e24c34c077454d2659779db67eb4bbbe73e80@9d06e592-3cf1-4878-9575-46b9a706ba4f-bluemix.cloudant.com';
let DB ='/logistics/';

// Date 
var currentdate = new Date(); 

function dateCount(){


let  datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

                return datetime;
};




   let company= 'whiznext';
   let type = 'Import';
   let startDate =20180405;
   let endDate = 20181115;
   let client = "DECCAN FINE CHEMICALS (INDIA) PVT LTD";
   let allFields =  client + '_' + type;
   //company + '_' + client + '_' + type;
   let url =  PROD_HOST + DB + '_design/logisticsDesign/_search/recordsByClientAndDateRange?include_docs=true';

       url = url + '&query=string: \"' + allFields + '\" AND dateRange:['
                 + startDate + ' TO ' + endDate + ']';

//store();
//fetchData();




function store(){
    console.log('started',dateCount());


http({
    uri: HOST + DB,
    method: 'POST',
    json:{company:'whinext',lrNumber:123,_id:'444444444444'}
}, function (error, response, body) {
    if (error) {
        console.log(error);
    } else {
        console.log(response.statusCode);
        console.log(response.statusMessage);
       

    }
})
}



function fetchData(){
   

       //url = url + '&query=org: \"' + company + '\"';
       //console.log(url);
       console.log('started',dateCount());
    http({
        uri:url ,
        method: 'get',
        
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
            console.log(response.statusMessage);
            console.log(JSON.parse(body).total_rows);
            //console.log(body)
            console.log('end',dateCount());
    
        }
    })
    }

    let allRowsNoDocs = [];

    queryDocumentsNoDocs( url,url,function(err, returnData){

        console.log( 'DATA RETURNED: ' + returnData);
        console.log( 'END TIME: ' ,dateCount());
    
    });
    
    
    function queryDocumentsNoDocs( url, baseUrl, callback)
    {  
       
       http( {
            uri: url,
            method: 'GET'     
          },
          function ( error, response, body ) {
    
          
           // error 
            if ( error ) {
              console.log('Failed to get the logistics records for clientName and dateRange ' + url );
              console.log( error );
              callback( error );
            }
             
            try{
                 
                 var jsonBody =  JSON.parse(body);
          
    
            } catch (err){
                   console.log(" ----URL:" + baseUrl);
                 console.log("---- BODY: " + body);	   
                 console.log("-----ERROR: " + err);
    
            }
               
            for ( var i=0; i < jsonBody.rows.length; i++)
            {
            
              if ( !( jsonBody.rows[ i ].doc._id.includes( "_design" ) ) ) {
             
                  
                    allRowsNoDocs.push(jsonBody.rows[i].doc); // first 25               
    
               }
            }
          
    
            if ( jsonBody.total_rows > 25 && jsonBody.rows.length > 0 )
            {
               // recrsive loop 
              // Loop
              var bookmark = jsonBody.bookmark;
              var newUrl = baseUrl + '&bookmark=' + bookmark;
          
                  //console.log("totalRecords",jsonBody.total_rows);
                  queryDocumentsNoDocs(newUrl,baseUrl, callback);
                  console.log("pushedData ....... " + allRowsNoDocs.length );
                  console.log('re Featching TIme ',dateCount());
                  /*console.log(" ----URL:" + baseUrl); 
                  console.log("BOOKMARK ..........." + bookmark );
                  console.log("FORMED URL " + newUrl);*/ 
    
            }
            else {
                       
                   callback( null,buildReturnJson(allRowsNoDocs, response));
    
            }
    
          })
        
     }
    
    
    function buildReturnJson( body, response ) {
      var toReturn = {
        "body": body,
        "statusCode": response.statusCode,
        "statusMessage": response.statusMessage
      };
      return toReturn;
    }
     