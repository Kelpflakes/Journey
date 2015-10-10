var express = require("express"),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080;


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);