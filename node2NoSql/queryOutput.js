let blnumbers = [

    "ZIMUHFA4138673", // v-001
    "57900684",
    "57906217",
    "2264169",
    "2267373",
    "SHXY190200280",
    "1250061",
    "SHXY190300001",
    "00174946",
    "00174948",
    "57906223",
    "269506840",
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
    "1250072",
    "RMAVUC10008001",
    "RMAVUC10008201",
    "57922048",
    "HLCUANR190335156",
    "ZIMUHFA4141166",
    "0339501786",
    "2282325",
    "HLCUANR190361176",
    "ZIMUFA4143791",
    "57926499",
    "ZIMUHFA4144087", //17
];

let http = require('request');
let CLOUDANT_HOST = process.env.CLOUDANT_HOST_SSL_PROD,
    DB = '/sslwarehouse/',
    APPLICATION_JSON_HEADER = 'application/json; charset=utf-8',
    ALLDOCS_QUERY = '_all_docs?include_docs=true';

let count = 1
getRecordsData();
async function getRecordsData() {
    console.log(blnumbers.length)

    for (var i = 0; i < blnumbers.length; i++) {
        await getUserFilesNumbers(blnumbers[i])
        //console.log(count = count + 1)
        if (count == blnumbers.length) {
            console.log("Un able to fetch ", blData);   
            console.log("able to fetch",errorData);
            //await updateFileNumbers()
        }

    }

}

let blData = [];
let errorData = [];
function getUserFilesNumbers(number) {
    // console.log(number)


    let id = count.toString()  + "1920";
    // let id = number.substr(number.length - 4, number.length);
    var url = CLOUDANT_HOST + DB +
        '_design/sslDesignDoc/_search/fileBasedSearch?include_docs=true&query=fileNumbers:\"' + id + '\"';

    console.log(url)
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            http({
                uri: url,
                method: 'GET',
                headers: APPLICATION_JSON_HEADER
            }, function (error, response, body) {
                if (error) {
                    reject(new Error('Ooops, something broke!', error));
                } else {
                    jsonData = JSON.parse(body)
                    resolve(response.statusCode)
                    if (jsonData.rows == undefined) {
                        blData.push(id);

                        // console.log("if")
                        resolve(blData)
                    } else {
                        // console.log("else")
                        errorData.push(jsonData.rows[0].doc.userEnteredFileNumber);
                        resolve(errorData)

                    }
                }


            })
        }, 1000)
    });

}
