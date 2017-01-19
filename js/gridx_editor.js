/**
 * Created by s.cosma on 04/10/2016.
 */
require([
        'dojo/store/Memory',
        'gridx/Grid',
        'gridx/core/model/cache/Sync',
        "gridx/modules/CellWidget",
        "gridx/modules/Edit",
        'dijit/form/TextBox',
        'dijit/_Widget',
        'dijit/_TemplatedMixin',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/_base/declare',
        'dijit/form/TextBox',
        'dijit/form/NumberTextBox'
    ],
    function (Store, Grid, Cache, CellWidget, Edit, TextBox, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, declare, TextBox, NumberTextBox) {

        declare('gridx.tests.CustomEditor', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: [
                '<table><tr><td style="width: 100px;">',
                '<label>Composer:</label>',
                '</td><td>',
                '<div data-dojo-type="dijit.form.TextBox" data-dojo-attach-point="composer"></div>',
                '</td></tr><tr><td style="width: 100px;">',
                '<label>Song Name:</label>',
                '</td><td>',
                '<div data-dojo-type="dijit.form.TextBox" data-dojo-attach-point="songName"></div>',
                '</td></tr><tr><td style="width: 100px;">',
                '<label>Year:</label>',
                '</td><td>',
                '<div data-dojo-type="dijit.form.NumberTextBox" data-dojo-attach-point="year"></div>',
                '</td></tr></table>'
            ].join(''),
            _setValueAttr: function(value){
                this.composer.set('value', value[0]);
                this.songName.set('value', value[1]);
                this.year.set('value', parseInt(value[2], 10));
            },
            _getValueAttr: function(value){
                return [
                    this.composer.get('value'),
                    this.songName.get('value'),
                    this.year.get('value')
                ];
            },
            focus: function(){
                this.composer.focus();
            }
        });

        //Custom edit grid
        declare('gridx.tests.CustomEditor2', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: [
                "<div>Name: <span data-dojo-attach-point='instrument'></span></div>"
            ].join(''),
            _setValueAttr: function(value){

                this.instrument = value[0];
            },
            _getValueAttr: function(value){
                return [
                    this.instrument.get('value')
                ];
            },
            focus: function(){
                console.log("focus");
            },

        });


        var result = [];

        for(var i = 1; i<=10;i++){
            result.push({
                id: i, name: 'Name ' + i, surname: 'Surname ' + i, instrument: 'Instrument '+ i
            })
        }

        var storeData = {
            identifier: 'id',
            items: result
        };

        store = new Store({data: storeData});

        var columns = [
            {field: 'id', name: 'Identity'},
            {field: 'name', name: 'Name'},
            {field: 'surname', name: 'Surname'},
            {
                field: 'instrument', name: 'Main Instrument', editable: true,
                editor: 'gridx.tests.CustomEditor',
                editorArgs: {
                    //Feed our editor with proper values
                    toEditor: function (storeData, gridData) {
                        debugger;
                        return ["Simone", "Cosma", 1985];
                    }
                },
                //Define our own "applyEdit" process
                customApplyEdit: function(cell, value){
                    return cell.row.setRawData({
                        name: value[0],
                        surname: value[1],
                        instrument: value[2]
                    });
                }
            }
        ];

        grid = new Grid({
            cacheClass: Cache,
            store: store,
            structure: columns,

            modules : [
                CellWidget,
                Edit
            ],
            // You can pass parameters to a single module using the convention moduleNameParameterName
            columnResizerMinWidth: 10,
            paginationInitialPageSize: 10,
            paginationBarMessage: "${2} to ${3} of ${0} items ${1} items selected"
        }, 'gridNode');

        grid.startup();
    });