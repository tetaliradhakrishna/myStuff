let http = require('request');

// diff with objepct whole data i._id 
Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i._id) < 0; });
};


let CLOUDANT_HOST = process.env.CLOUDANT_HOST_SSL_PROD,
    DB = '/sslwarehouse/',
    APPLICATION_JSON_HEADER = 'application/json; charset=utf-8',
    ALLDOCS_QUERY = '_all_docs?include_docs=true',
    message = "Fetching...............",

    notIntheList = ["269506840", "1250072", "1250072", " 1250072", "RMAVUC10008001", "ZIMUHFA4143791"]
blnumbers = [
    "0000",
    "ZIMUHFA4138673", // v-001
    "57900684",
    "57906217",
    "2264169",
    "2267373 ",
    "SHXY190200280",
    "1250061",
    "SHXY190300001",
    "00174946",
    "00174948",
    "57906223",
    "HLCUHAM190260864",
    "HLCULE1190209542",
    "RMAVUC10006701",
    "57892577",
    "1423901",
    "1423552-54",
    "1423900",
    "HLCUANR190263257",
    "0089A09467",
    "1250070",
    "ZIMUHFA4141025",
    "HLCUANR190319662",
    "00175629",
    "RMAVUC10008201",
    "57922048",
    "HLCUANR190335156",
    "ZIMUHFA4141166",
    "0339501786",
    "2282325",
    "HLCUANR190361176",
    "57926499",
    "ZIMUHFA4144087", //17
];


// fetch all docs from DB 
getAllDocs();

function getAllDocs() {
    console.log(message)
    http({
        uri: CLOUDANT_HOST + DB + ALLDOCS_QUERY,
        method: 'GET',
        headers: APPLICATION_JSON_HEADER
    }, function (error, response, body) {
        var rows = [];
        if (error) {
            console.log("Fetch time Error ", error);
        }
        var rowsObject = JSON.parse(body);
        if (response.statusCode !== 429) {
            if (response.statusCode !== 404) {
                for (var i = 0; i < rowsObject.rows.length; i++) {
                    if (!(rowsObject.rows[i].doc._id.includes("_design"))) {
                        rows.push(rowsObject.rows[i].doc);
                    }
                }
            }
        }
        // seperating the user data and whole data 
        seperatetheData(rows, blnumbers)

    });
}
// we have the two arrays  how to ge the macthed data ????
function seperatetheData(row, number) {
    // we need to get macthed results  && unmacthed data too 
    console.log("FROM DB Total", row.length);

    total_bl_withOut_Error_numbers = [];

    for (var i = 0; i < row.length; i++) {
        if (row[i].blData !== undefined) {
            total_bl_withOut_Error_numbers.push(row[i]);
        }
    }
   // console.log("Removed undefined /null / design ", total_bl_withOut_Error_numbers.length);
    //console.log("User Entred bls ", number.length);

    // un matched results 
    let q = total_bl_withOut_Error_numbers.diff(number);

    //console.log('Un_Matched_records', q.length);
    // calling  bulk update 
    update_records(q)
    //console.log("UserEntred Bills  + Unmatched bills = ", number.length + q.length);

}

async function update_records(data) {

    for (var i = 0; i < data.length; i++) {
        await update(data[i])
    }
}

function update(data) {

    console.log("data to update", data._id);



    data.billingData = { status: "billGenerated" };
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            http({
                url: CLOUDANT_HOST + DB + data._id,
                headers: 'application/json',
                method: 'PUT',
                json: data
    
            }, (error, response, body) => {
        
                if (error) {

                    reject(new Error('Ooops, something broke!',error));
            
                  } else {
            
                    resolve(response.statusCode,response.statusMessage);
            
                  }
        
            },2000)

        })
    })
}