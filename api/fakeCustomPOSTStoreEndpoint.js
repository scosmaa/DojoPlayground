/**
 * Created by s.cosma on 23/08/2016.
 */
var express = require('express');
var url = require('url');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var enableCors = function (res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Content-Range");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-Range, Access-Control-Max-Age, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Range, Content-Range, Access-Control-Expose-Headers, cache-control");
};

// Creating example data
var data = [];
var lastId = 0;
for(var i = 1; i<=100;i++){
    data.push({
        id: i, name: 'Name ' + i, surname: 'Surname ' + i, instrument: 'Instrument '+ i
    });
    lastId = i;
}

app.all('/*', function(req, res, next) {
    enableCors(res);
    next();
});

app.post('/get', function (req, res) {
    enableCors(res);
    var result = data.filter(function (elem) {
        return elem.id == parseInt(req.body.id);
    });

    res.send(result[0]);
});

app.post('/put', function (req, res) {
    enableCors(res);
    var newElement = req.body;

    var result = data.filter(function (elem) {
        return elem.id == parseInt(newElement.id);
    });
    // Aggiungo il nuovo elemento
    if(result.length === 0){
        lastId++;
        newElement.id = lastId;
        data.push(newElement);
    } else {
        var id = data.indexOf(result[0]);
        data[id] = newElement;
    }

    res.send(newElement);
});

app.post('/remove', function (req, res) {
    enableCors(res);
    var id =  req.body.id;
    console.log(id);
    data.pop();
    res.send(id);
});

app.post('/query', function (req, res) {
    enableCors(res);
    var queryParams =  req.body;
    console.log(queryParams);

    var resultData = data.slice(queryParams.start,queryParams.end);
    resultData.total = data.length;
    res.send({
        data: resultData,
        total: data.length
    });
});


app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});