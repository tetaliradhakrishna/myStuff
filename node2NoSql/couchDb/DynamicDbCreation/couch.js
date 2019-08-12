const NodeCouchDb = require('node-couchdb');
 
// node-couchdb instance with default options

// admin auth 


 const couch = new NodeCouchDb({
 	 host: '120.138.9.64',
    protocol: 'http',
    port: 5984,
     auth: {
        user: 'whiznext',
        pass: 'Whiznext@123'
    }
 });
 

/*var NEW_DB = 'whiznext' 
couch.insert(NEW_DB, {
    "_id": "_design/esignup",
    "views": {
        "alldocs": {
            "map": "function (doc) {  emit(doc);}"
        }
    },
    "language": "javascript"
});*/


 
var NEW_DB = 'radhkrishnatest' 
couch.createDatabase(NEW_DB).then((res) => {
  console.log('data',res)
}, err => {
	//console.log(err);
	//console.log(err.body.reason)
    //request error occured
});


// couch.dropDatabase(NEW_DB).then(() => {

//   },err => {
//     console.log(err);
//   });





/*const dbName = "crmcontactlist";
const mangoQuery = {
    "selector": {
    	"ContactbelongsTo":{
    	      "$eq": 'radhakrishna@whiznext.com'	
    	},
    },
    //based on the limit getting the data 
    // how we come to know that how much data we hold in the db 
    // how to ge the matched query length in the 
     "limit": 500
};

 
couch.mango(dbName, mangoQuery).then(({data, headers, status}) => {
   console.log('data',data.docs.length);
   console.log('headers',headers);
   console.log('status',status);
   console.log(data.docs);
}, err => {

	console.log(err);
    // either request error occured
    // ...or err.code=EDOCMISSING if document is missing
    // ...or err.code=EUNKNOWN if statusCode is unexpected
});
*/