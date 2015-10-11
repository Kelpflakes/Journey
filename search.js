
var http = require("https");

module.exports = {
    search: function (term, callback){
        console.log(term);
        //console.log(coorB);
        
        var buffer = "";
        url = "https://places.demo.api.here.com/places/v1/suggest?at=52.5159%2C13.3777&q=" + term + "&app_id=coZYlKFfMv8P9SZZj5AF&app_code=b9mg-A1AaGwMKGdcIFPOJg";

        // get is a simple wrapper for request()
        // which sets the http method to GET
        var request = http.get(url, function (response) {
            // data is streamed in chunks from the server
            // so we have to handle the "data" event    
            

            response.on("data", function (chunk) {
                buffer += chunk;
            }); 

            response.on("end", function (err) {
                // finished transferring data
                // dump the raw data
                //console.log(buffer);
                //console.log("\n");
                var response = JSON.parse(buffer);
                //console.log(response);
                callback(
                    response
                );
            }); 
        }); 
    }
}
