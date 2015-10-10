var express = require("express"),
    geocoder = require("./geocoder.js"),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080;

app.use(express.static('public'));

router.get("/", function(req, res){
    res.sendFile(__dirname + '/public/inputpage.html');
});

router.get('/test', function(req, res) {     
    var start = req.query.start;
    var end = req.query.end;
    var time = req.query.time;
    var dataS = geocoder.coder(start);
    var dataE = geocoder.coder(end);
    
    //res.send(dataS.DisplayPosition);
});


app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);