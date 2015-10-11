var express = require("express"),
    geocoder = require("./geocoder.js"),
    pathfinder = require("./pathfinder.js"),
	search = require("./search.js"),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080,
    dataS,
    dataE,
    time,
    path,
	suggestions,
	suggestedTerm;
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

router.get("/cancel", function(req, res){
        //console.log(path);
        console.log("cancel");
        res.redirect("/inputpage.html");
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

router.get("/getsuggestions", function(req, res){
	
	//console.log(req);
	search.search(req.query.term, setSearchResults);
	suggestedTerm = req.query.term;
	//console.log(suggestions);
	if (suggestions != null){
		res.send(suggestions);
		//console.log("Sent suggestions");
	}
	
});   

router.get("/return", function(req, res){
    console.log("returned");
    res.redirect("/inputpage.html");
});

var setS = function(data){
	if (data == null){
		//resm.redirect("/inputpage.html");
		return;
	}
    console.log("setS");
	 console.log(data);
	
    dataS = data;
	console.log(dataS);
	console.log(dataE);
    if (dataE != null && dataS != null){
        pathfinder.route(dataS, dataE, pathfinding);
		console.log("BGFG1");
        dataE = null;
        dataS = null;
    }
}

var setE = function(data){
    if (data == null){
		//resm.redirect("/inputpage.html");
		return;
	}
    console.log("setE");
	 console.log(data);
	
    dataE = data;
	console.log(dataS);
	console.log(dataE);
    if (dataS != null && dataE != null){
        pathfinder.route(dataS, dataE, pathfinding);
		console.log("BGFG2");
        dataE = null;
        dataS = null;
    }
}

var setSearchResults = function(data){
	//console.log("This is a test");
	if (data != null)
	suggestions = data;
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