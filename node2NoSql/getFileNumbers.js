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

    let count = 0
getRecordsData();
async function getRecordsData() {
    console.log(blnumbers.length)
    
    for (var i = 0 ;i < blnumbers.length; i++) {
        await getUserFilesNumbers(blnumbers[i])
       console.log( count = count + 1) 
       if(count == blnumbers.length){
        console.log(" Whole Data", blData.length, errorData)
        await updateFileNumbers()
       }

    }

}

 let count2  = 1;
async function updateFileNumbers(){
    console.log("afterData length",blData.length)
    for (var i = 0 ;i < blData.length; i++) {
        await update(blData[i])
        count2  =count2 + 1
    }

}


let blData = [];
let errorData = [];
function getUserFilesNumbers(number) {
   // console.log(number)

   // let id = number.substr(number.length - 4, number.length);
    var url = CLOUDANT_HOST + DB +
        '_design/sslDesignDoc/_search/fetchForUpdate?include_docs=true&query=record:\"' + number + '\"';

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
                   //console.log(response.statusCode,response.statusMessage,body);
                    jsonData = JSON.parse(body)
                   // console.log(jsonData)
                    resolve(response.statusCode)
                    if (jsonData.rows[0].doc.billingData == undefined) {
                        blData.push(jsonData.rows[0].doc);

                       // console.log("if")
                        resolve(blData)
                    } else {
                       // console.log("else")
                        errorData.push(jsonData.rows[0].doc);
                        resolve(errorData)

                    }
                }
               

            })
        } ,1000)
    });

}


function update(data) {

    console.log("data to update", data._id);
    console.log("data filenumber update to DB ",count2)

    data["userEnteredFileNumber"] = count2.toString() + "1920" ;
   //console.log(data)

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