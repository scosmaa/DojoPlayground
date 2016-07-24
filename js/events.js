/**
 * Created by scosmaa on 17/07/2016.
 */
require([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/mouse',
    'dojo/_base/lang',
    'dojo/topic',
    'dojo/domReady!'
], function (
    on,
    dom,
    domStyle,
    mouse,
    lang,
    topic
) {
    var myButton = dom.byId('myButton'),
        myDiv = dom.byId('myDiv'),
        myLastButton = dom.byId('myLastButton'),
        myObj = {
            id: 'Obj_ID',
            onClick: function () {
                alert("The scope of this handler is " + this.id);
            }
        };

    on.once(myButton, 'click', myObj.onClick);
    on.once(myLastButton, 'click', lang.hitch(myObj, myObj.onClick));

    on(myDiv, mouse.enter, function () {
        domStyle.set(myDiv, 'backgroundColor', '#000')
    });

    on(myDiv, mouse.leave, function () {
        domStyle.set(myDiv, 'backgroundColor', '#fff');
        topic.publish('myTopic', {id: 1, text:'Exited!'});
    });

    topic.subscribe('myTopic', function (text) {
        console.log(this);
        console.log(arguments);
    });
});