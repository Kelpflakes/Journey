var http = require("https");

module.exports = {
    coder: function (a, callback){
        //console.log(a);
        var mystring = a;
        var buffer = "";
        mystring.replace(/ /g , "%20");
        //console.log(mystring);
        url = "https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=" + mystring + "&app_id=coZYlKFfMv8P9SZZj5AF&app_code=b9mg-A1AaGwMKGdcIFPOJg&gen=8";

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
                //console.log("\n");
                var response = JSON.parse(buffer);
				if (response.Response.View[0] != null){
                console.log(response.Response.View[0].Result[0].Location.NavigationPosition);
                callback(
                    response.Response.View[0].Result[0].Location.NavigationPosition
                );
				}
            }); 
        }); 
    }
}
