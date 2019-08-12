var nano = require("nano")("http://localhost:5984"); 
var http = require("http"); 
var server = http.createServer(function (request, response) { 
    var urPersonalData = { 
        name: "Radhakrishna", 
        sex:  "Male", 
        phoneNumber: "9030858444", 
        id: "978-234569871"
    }; 
     
    nano.use("first").insert(urPersonalData, urPersonalData.id, function(err, body, header) { 
        if(err) { 
            response.writeHead(500, { "Content-Type": "text/plain" }); 
            response.end("Inserting book failed. " + err + "\n"); 
        } else { 
            response.writeHead(200, { "Content-Type": "text/plain" }); 
            response.end("Book inserted. Response: " + JSON.stringify(body) + "\n"); 
        } 
    }); 
}); 
 
server.listen(8000); 
console.log("Server running at http://127.0.0.1:8000/"); 

