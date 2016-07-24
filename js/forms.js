/**
 * Created by scosmaa on 24/07/2016.
 */
require([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/keys',
    'dojo/_base/lang',
    "dojo/query",
    "dojo/NodeList-traverse",
    'dojo/domReady!'
], function (
    on,
    dom,
    domStyle,
    keys,
    lang,
    query
) {

    on(dom.byId('myForm'), 'keydown', function (event) {
        var node = query.NodeList([event.target]);
        var nextNode;
        switch (event.keyCode) {
            case keys.UP_ARROW:
                nextNode = node.prev("input");
                if (nextNode){
                    nextNode.last()[0].focus();
                }
                break;
            case keys.DOWN_ARROW:
                nextNode = node.next("input");
                if (nextNode){
                    nextNode[0].focus();
                }
                break;
        }
    });
});
