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

app.route('/mappage')
    .get(function(req, res) { 
        console.log("mapping");
        res.sendFile(__dirname + '/public/mappage.html');
    })
    .post(function(req, res) {  
        console.log("plz");
        var start = req.body.start;
        var end = req.body.end;
        time = req.body.time;
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
    console.log(path);
    res.json(data);
}

app.use("/", router);
app.use(express.static('public'));
app.listen(port);
console.log('Magic happens on port ' + port);