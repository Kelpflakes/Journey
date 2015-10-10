var express = require("express"),
    geocoder = require("./geocoder.js"),
    pathfinder = require("./pathfinder.js"),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080,
    dataS,
    dataE,
    time,
    path;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

router.get("/", function(req, res){
    res.sendFile(__dirname + '/public/inputpage.html');
});

router.post("/set", function(req, res) {  
    var start = req.body.start;
    var end = req.body.end;
    //console.log(start + " " + end);
    time = req.body.time;
    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    geocoder.coder(start, setS);
    geocoder.coder(end, setE);
    res.redirect("/mappage.html");
});

router.get("/getpath", function(req, res){
        console.log(path);
        while (path === null){
            
        }
        console.log("path");
        res.send(path);
    });

    

var setS = function(data){
    console.log("setS");
    dataS = data;
    if (dataE != null){
        pathfinder.route(dataS, dataE, pathfinding);
        dataE = null;
        dataS = null;
    }
}

var setE = function(data){
    
    console.log("setE");
    dataE = data;
    if (dataS != null){
        pathfinder.route(dataS, dataE, pathfinding);
        dataE = null;
        dataS = null;
    }
}

var pathfinding = function(data){
    path = data;
    //console.log(path);
    /*path = path.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
    path = path.replace(/[\u0000-\u0019]+/g,""); 
    path = JSON.parse(path);*/
    //console.log(path);
}

app.use("/", router);
app.listen(port);
console.log('Magic happens on port ' + port);