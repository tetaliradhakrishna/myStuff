let CLOUDANT_HOST_SSL_PROD = process.env.CLOUDANT_HOST_SSL_PROD;
     //console.log("process",CLOUDANT_HOST_SSL_PROD);
let page_result = 10;
let skip_rows = 1;
let url =  CLOUDANT_HOST_SSL_PROD + '/sslwarehouse/'  + '_design/sslDesignDoc/_search/byClientName?include_docs=true';
		
    // work on this procees for pagination and queies
    // integrated limit option  based on the  given number records will be fetch
    // what is skip  
    url = url + '&query=client:\"' + process.env.CLIENT_NAME + '\"' 
             // + '&skip=' + skip_rows 
              //+ '&limit=' + page_result;

let http = require('request');

moreThan25Docs(url,url);
let allRowsNoDocs  =[];
function moreThan25Docs(url, baseUrl) {

	//console.log('ueahsjdjflkasdfkl0000000',SSL_LOGISTICS_CLOUDANT_HOST + url);
	var message = "Processing.....",jsonBody;
	http(
			{
				uri :url,
				method : 'GET',
				headers : 'Content-Type: application/json,charset:utf8',
			},
			function(error, response, body) {

				// error
				if (error) {
					//callback(null, error);
				}

				try {

					 jsonBody = JSON.parse(body);
					 console.log('total_rows',jsonBody.total_rows);
					//console.log("JSON BODY",jsonBody);

				} catch (err) {
					console.log(" ----URL:" + url);
					console.log("---- BODY: " + body);
					console.log("-----ERROR: " + err);

				}

				for (var i = 0; i < jsonBody.rows.length; i++) {

					if (!(jsonBody.rows[i].doc._id.includes("_design"))) {

						allRowsNoDocs.push(jsonBody.rows[i].doc); // first
						// 25
					}
				}

				if (jsonBody.total_rows > 25 && jsonBody.rows.length > 0) {
					// recrsive loop
					// Loop

					var bookmark = jsonBody.bookmark;
					var newUrl = baseUrl + '&bookmark=' + bookmark;

					moreThan25Docs(newUrl, baseUrl);
					//sleep.sleep(2);
					console.log(message);
					console.log(allRowsNoDocs.length);

				} else {

						buildReturnJson(allRowsNoDocs, response);
						emptyAllRows();
				}
		})

};

function emptyAllRows() {

	allRowsNoDocs = [];
};

function buildReturnJson(body, response) {
	var toReturn = {
		"body" : body,
		"statusCode" : response.statusCode,
		"statusMessage" : response.statusMessage
	};
	return toReturn;
};