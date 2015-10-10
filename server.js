var express = require("express"),
    geocoder = require("./geocoder.js"),
    pathfinder = require("./pathfinder.js"),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080,
    dataS,
    dataE,
    time,
    path;

app.use(express.static('public'));

router.get("/", function(req, res){
    res.sendFile(__dirname + '/public/inputpage.html');
});

//router.get('/test', function(req, res) { 
    //res.sendFile(__dirname + '/public/mappage.html');
//});

router.get('/mappage', function(req, res) {  
    console.log("plz");
    var start = req.query.start;
    var end = req.query.end;
    time = req.query.time;
    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    geocoder.coder(start, setS, req, res);
    geocoder.coder(end, setE, req, res);
    
});

var setS = function(data, req, res){
    dataS = data;
    if (dataE != null){
        console.log("Yolo1");
        pathfinder.route(dataS, dataE, pathfinding, req, res);
        dataE = null;
        dataS = null;
    }
}

var setE = function(data, req, res){
    dataE = data;
    //console.log(dataS);
    //console.log(dataE);
    if (dataS != null){
        
        console.log("Yolo2");
        pathfinder.route(dataS, dataE, pathfinding, req, res);
        dataE = null;
        dataS = null;
    }
}

var pathfinding = function(data, req, res){
    path = data;
    //console.log(path);
    res.json(data);
}

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);