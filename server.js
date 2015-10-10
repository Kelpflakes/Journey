var express = require("express"),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080;

app.use(express.static('public'));


router.post('/hello', function(req, res) {   
    //res.json({ message: 'hooray! welcome to our api!' });    
});

router.get('/hello', function(req, res) {   
    res.json({ message: 'hooray! welcome to our api!' });    
});

app.use('/result', router);
app.listen(port);
console.log('Magic happens on port ' + port);