let request = require('request');


let CLOUDANT_HOST = process.env.CLOUDANT_HOST_SSL_PROD,
    DB = '/sslwarehouse/',
    APPLICATION_JSON_HEADER = 'application/json; charset=utf-8';

// http://120.138.9.64:6019/ssl-logistics/v1/recordsByState?clientName=DECCAN FINE CHEMICALS (INDIA) PVT LTD&state=READY_TO_DISPATCH&companyName=ssl
getChaReportData('DECCAN FINE CHEMICALS (INDIA) PVT LTD' );
//getChaReportData(undefined,undefined,20190401,20190619);
//startDate=20190401&endDate=20190619
function getChaReportData(clientName, state, startDate, endDate, callback) {
    var url = CLOUDANT_HOST + DB+ '_design/sslDesignDoc/_search/recordsByState?include_docs=true';

    if (clientName == undefined && state == undefined) {

        url = url + '&query=dateRange:[' + startDate + ' TO ' + endDate + ']';
        console.log("startEndDate");
    }

    else if (state == undefined) {

        if (startDate == undefined && endDate == undefined) {
            url = url + '&query=clientName: \"' + clientName + '\"';
            console.log("only Client Name" + url);
        } else {
            url = url + '&query=clientName: \"' + clientName + '\" AND dateRange:[' + startDate + ' TO ' + endDate + ']';
            console.log("clientStartEndDate" + url);
        }
    }
    else if (clientName == undefined) {

        if (startDate == undefined && endDate == undefined) {
            url = url + '&query=state: \"' + state + '\"';
            console.log("only state" + url);
        } else {

            url = url + '&query=state:\"' + state + '\" AND dateRange:[' + startDate + ' TO ' + endDate + ']';
            console.log("stateStartEndDate" + url);
        }
    }
    else if (startDate == undefined && endDate == undefined) {
        var allFields = clientName + '_' + state
        url = url + '&query=string: \"' + allFields + '\"';
        console.log(" ony state and Clinet name" + url);

    }


    else {
        // if user given two or more  inputs
        var allFields = clientName + '_' + state;
        url = url + '&query=string: \"' + allFields + '\" AND dateRange:[' + startDate + ' TO ' + endDate + ']';
        console.log("clientName AND State AND StartDate And EndDate: " + url);

    }

    moreThan25Docs(
        url,
        url,
        function (err, results) {
            if (err) {
                //callback("Failed to get all the documents from database cargo data base: "
                //  + url);
            } else {
               // console.log(results);
               //callback(null, results);
            }

        })
};

let allRowsNoDocs = [];


function moreThan25Docs(url, baseUrl, callback) {

    //console.log('ueahsjdjflkasdfkl0000000',SSL_LOGISTICS_CLOUDANT_HOST + url);
    var message = "Processing.....", jsonBody;
    request(
        {
            uri: url,
            method: 'GET',
            headers: APPLICATION_JSON_HEADER,
        },
        function (error, response, body) {

            // error
            if (error) {
                callback(null, error);
            }

            try {

                jsonBody = JSON.parse(body);
                console.log('total_rows', jsonBody.total_rows);
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

                moreThan25Docs(newUrl, baseUrl, callback);
                //sleep.sleep(2);
                console.log(message);

            } else {
                 
                callback(null, buildReturnJson(allRowsNoDocs, response));
                filterData();
                //emptyAllRows();
              
            }
        })

};

function filterData(){
    console.log()
    for (var i=0;i<allRowsNoDocs.length;i++){
        console.log( "state: " + allRowsNoDocs[i].state + " BlNumber:" +  allRowsNoDocs[i].blData.blNumber  + " ---- Type: " + allRowsNoDocs[i].billOfEntry.type);  
    }
}

function emptyAllRows() {

    allRowsNoDocs = [];
};

function buildReturnJson(body, response) {
    var toReturn = {
        "body": body,
        "statusCode": response.statusCode,
        "statusMessage": response.statusMessage
    };
    return toReturn;
};

