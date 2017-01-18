/**
 * Created by s.cosma on 04/10/2016.
 */
require([
        'dojo/parser',
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
        "dojo/ready",
        "dojo/dom-construct"
    ],
    function (parser, Store, Grid, Cache, CellWidget, Edit, TextBox, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, declare, ready,domConstruct) {

        //Custom edit grid
        declare('CustomEdit', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: [
                "<div>Name: <span data-dojo-attach-point='instrument'></span></div>"
            ].join(''),
            _setValueAttr: function(value){

                this.set('instrument', value[0]);
            },
            _getValueAttr: function(value){
                return [
                    this.instrument.get('value')
                ];
            },
            focus: function(){
                this.instrument.focus();
            },

        });

        declare("BusinessCard", [_Widget, _TemplatedMixin], {
            templateString:
            "<div class='businessCard'>" +
            "<div>Name: <span data-dojo-attach-point='nameNode'></span></div>" +
            "<div>Phone #: <span data-dojo-attach-point='phoneNode'></span></div>" +
            "</div>",

            // Attributes
            name: undefined,
            _setNameAttr: { node: "nameNode", type: "innerHTML" },

            nameClass: "employeeName",
            _setNameClassAttr: { node: "nameNode", type: "class" },

            phone: undefined,
            _setPhoneAttr: { node: "phoneNode", type: "innerHTML" },

            _setValueAttr: function(value){
                this.name.set("value",value[0]);
                this.phone.set("value", value[1]);
                console.log(value)
            }
        });

        declare("MyFirstWidget", [_Widget], {
            buildRendering: function(){
                // create the DOM for this widget
                this.domNode = domConstruct.create("button", {innerHTML: "push me"});
            }
        });

        ready(function(){
            // Create the widget programmatically and place in DOM
            (new MyFirstWidget()).placeAt(document.body);
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
                editor: 'CustomEdit',
                editorArgs: {
                    //Feed our editor with proper values
                    toEditor: function (storeData, gridData) {
                        debugger;
                        return ["Simone", "Cosma"];
                    }
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

        parser.parse();
    });