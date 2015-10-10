var express = require("express"),
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
    res.send(start + ' ' + end + ' ' + time);
});


app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);