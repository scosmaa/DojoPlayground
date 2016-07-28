/**
 * Created by s.cosma on 28/07/2016.
 */
define([
    'dojo/_base/declare',
    'gridx/core/_Module'
], function (declare, _Module) {
    return declare([_Module], {
        name: 'customModule',
        forced: ['header'],

        constructor: function () {
            console.log('I am the customModule constructor!')
        },

        // Determines how you can access to this module using the grid object:
        // eg. grid.customModule.something
        getAPIPath: function () {
            return {
                customModule: this
            }
        },

        preload: function (args) {
            console.log('I am the customModule preloader!');
            console.log('preload args', args);
            console.assert(this.grid.row, 'This object should exist');
        },

        load: function (args) {
            console.log('I am the customModule loader!');
            console.log('load args', args);

            this.connect(this.grid, 'onRowDblClick', function(e){
                this.testMethod(e.rowId);
            });
        },

        testMethod: function (id) {
            console.log("double click on row " + id);
        },

        printSomethingFromMe: function(something){
            console.log('Custom Module says: ' + something);
        },

        destroy: function(){
            this.inherited(arguments);
            //do something to tear me down here.
            //e.g.: dojo.destroy(this.domNode);
        },

        info: 'Test Module!'
    })
});