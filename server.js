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

router.get("/", function(req, res){
    res.sendFile(__dirname + '/public/inputpage.html');
});

router.post("/set", function(req, res) {  
    console.log("plz");
    var start = req.body.start;
    var end = req.body.end;
    console.log(start + " " + end);
    time = req.body.time;
    //res.contentType('application/json');
    //res.setHeader("Access-Control-Allow-Origin", "*");
    geocoder.coder(start, setS);
    geocoder.coder(end, setE);
    res.redirect("/mappage");
});

router.get("/mappage", function(req, res){
    res.sendFile(__dirname + '/public/mappage.html');    
});

    

var setS = function(data){
    dataS = data;
    if (dataE != null){
        console.log("Yolo1");
        pathfinder.route(dataS, dataE, pathfinding);
        dataE = null;
        dataS = null;
    }
}

var setE = function(data){
    dataE = data;
    if (dataS != null){
        
        console.log("Yolo2");
        pathfinder.route(dataS, dataE, pathfinding);
        dataE = null;
        dataS = null;
    }
}

var pathfinding = function(data){
    path = data;
    console.log(path);
}

app.use("/", router);
app.use(express.static('public'));
app.listen(port);
console.log('Magic happens on port ' + port);