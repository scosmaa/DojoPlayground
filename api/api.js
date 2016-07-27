var express = require('express');
var url = require('url');
var app = express();
var bodyParser = require("body-parser");

var enableCors = function (res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Content-Range");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-Range, Access-Control-Max-Age, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Range, Content-Range, Access-Control-Expose-Headers");
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/method1', function (req, res) {
    enableCors(res);
    res.send({operationResult: parseInt(req.body.left) + parseInt(req.body.right)});
});

app.post('/method2', function (req, res) {
    enableCors(res);
    res.send('ok method2');
});

app.get('/griddata', function (req, res) {
    enableCors(res);

    var range = req.get('Range').replace('items=','').split('-');

    console.log(range);

    res.header("Content-Range", ["items",range[0],'-',range[1],"/100"].join(''));

    var result = [];

    for(var i = 1; i<=100;i++){
        result.push({
            id: i, name: 'Name ' + i, surname: 'Surname ' + i, instrument: 'Instrument '+ i
        })
    }
    var firstIndex = parseInt(range[0]);

    setTimeout(function () {
        res.send(result.slice(firstIndex, firstIndex + 9 ));
    }, 2000);
});

app.all('/*', function(req, res, next) {
    enableCors(res);
    next();
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});