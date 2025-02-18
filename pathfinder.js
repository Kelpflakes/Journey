var http = require("https");

module.exports = {
    route: function (coorA, coorB, callback){
        console.log(coorA);
        console.log(coorB);
        
        var buffer = "";
        url = "https://route.cit.api.here.com/routing/7.2/calculateroute.json?waypoint0="+coorA[0].Latitude+"%2C"+coorA[0].Longitude+"&waypoint1="+coorB[0].Latitude+"%2C"+coorB[0].Longitude+"&mode=fastest%3Bcar%3Btraffic%3Aenabled&app_id=etW0rzf9MTtJGKg3JUzE&app_code=D_PBDcI7Ytka3wjH5pVHOA&departure=now";

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
                console.log(buffer);
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
