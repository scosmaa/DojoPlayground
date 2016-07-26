/**
 * Created by s.cosma on 26/07/2016.
 */
var seneca = require('seneca')();

seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
    var sum = msg.left + msg.right;
    console.log(['left:', msg.left, '|right:', msg.right].join(''));
    respond(null, {answer: sum})
});

seneca.listen();