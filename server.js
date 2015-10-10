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

router.get('/test', function(req, res) {     
    var start = req.query.start;
    var end = req.query.end;
    time = req.query.time;
    geocoder.coder(start, setS);
    geocoder.coder(end, setE);
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
    //console.log(dataS);
    //console.log(dataE);
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

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);