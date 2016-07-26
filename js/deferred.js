/**
 * Created by s.cosma on 26/07/2016.
 */
require(['dojo/Deferred', 'dojo/request', "dojo/aspect", "dojo/_base/array"],
    function (Deferred, request, aspect) {
        var deferred = new Deferred();

        deferred.then(function (data) {
            console.log('Successfull!', data);
        }, function() {
            console.log('ops! error!');
        });

        request.post('http://localhost:8080/method1',{data: {left: 1, right: 3},handleAs: "json"})
            .then(function (result) {
                handleResult(result);
            });

        this.handleResult = function (data) {
            console.log('Handled', data);
        };

        aspect.before(this, "handleResult", function (data) {
           deferred.resolve(data);
        });

        var method2Call = request.post('http://localhost:8080/method2').then(function (result) {
            console.log("method2Called",result);
        });

        console.log("waiting for method2Call",method2Call);


        // test chaining deferred using an object
        var originalDeferred = new Deferred();
        originalDeferred.resolve([1,2,3,4,5]);

        var childDeferred = originalDeferred.then(function (values) {
            var a = values.push(6);
            console.log('pushed', a);
          //  return values;

        });

        childDeferred.then(function (values) {
            console.log('childDeferred', values);
        });

        originalDeferred.then(function (values) {
            console.log('originalDeferred', values);
        });

        // test chaining deferred using a variable
        originalDeferred = new Deferred();
        originalDeferred.resolve(1);

        childDeferred = originalDeferred.then(function (value) {
            console.log('childDeferred', value);
            value = 2;
              return value;

        });

        childDeferred.then(function (value) {
            console.log('childDeferred', value);
        });

        // as you can see the value is not changed
        originalDeferred.then(function (value) {
            console.log('originalDeferred', value);
        });
    });