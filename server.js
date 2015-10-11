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
var resm;
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
	resm = res;
});

router.get("/getpath", function(req, res){
        //console.log(path);
        console.log("path");
        res.send(path);
    });
router.get("/gettime", function(req, res){
        //console.log(path);
        console.log("time");
        res.send(time);
    });
    

var setS = function(data){
    console.log("setS");
	 console.log(data);
	
    dataS = data;
	console.log(dataS);
	console.log(dataE);
    if (dataE != null){
        pathfinder.route(dataS, dataE, pathfinding);
		console.log("BGFG1");
        dataE = null;
        dataS = null;
    }
}

var setE = function(data){
    
    console.log("setE");
	 console.log(data);
	
    dataE = data;
	console.log(dataS);
	console.log(dataE);
    if (dataS != null){
        pathfinder.route(dataS, dataE, pathfinding);
		console.log("BGFG2");
        dataE = null;
        dataS = null;
    }
}

var pathfinding = function(data){
    path = data;
	console.log("Redirect");
	resm.redirect("/mappage.html");
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