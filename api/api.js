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

    // Creating example data
    var result = [];
    for(var i = 1; i<=100;i++){
        result.push({
            id: i, name: 'Name ' + i, surname: 'Surname ' + i, instrument: 'Instrument '+ i
        })
    }

    // filter
    var filterValue = req.query['filter'];
    console.log('filterValue',filterValue);
    if(filterValue){
        result = result.filter(function (elem) {
            var b =
               elem.id.toString().indexOf(filterValue) != -1 ||
               elem.name.indexOf(filterValue) != -1 ||
               elem.surname.indexOf(filterValue) != -1 ||
               elem.instrument.indexOf(filterValue) != -1;

            return b;
        });
    }

    // change order (for the sake of simplicity we assume that only the id column is sortable)
    var sortDescending = req.query['sort(-id)'] == '';
    console.log("sortDescending?", sortDescending);
    if(sortDescending){
        result.reverse();
    }

    var range = req.get('Range').replace('items=','').split('-');
    console.log("pagination range",req.get('Range'));
    res.header("Content-Range", ["items",range[0],'-',range[1],"/",result.length].join(''));

    var firstIndex = parseInt(range[0]);

    // Simulating delay (testing loading support)
    setTimeout(function () {
        res.send(result.slice(firstIndex, firstIndex + 10 ));
    }, 2000);
});

app.all('/*', function(req, res, next) {
    enableCors(res);
    next();
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});