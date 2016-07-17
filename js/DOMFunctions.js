/**
 * Created by scosmaa on 17/07/2016.
 */
require([
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/domReady!'
], function (
    dom,
    domConstruct
) {
    var list = dom.byId('list');
    var second = domConstruct.create('li', {innerHTML: '<b>Second</b>'}, list);
    var first = domConstruct.create('li', {innerHTML: 'First', 'class': 'highlight'}, list, 'first');
    domConstruct.destroy(second);
    console.log(list);
});