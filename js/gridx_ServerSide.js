/**
 * Created by s.cosma on 27/07/2016.
 */
require([
        'dojo/store/JsonRest',
        'gridx/Grid',
        'gridx/core/model/cache/ASync',
        'gridx/modules/SingleSort', //Require module source code
        'gridx/modules/ColumnResizer',   //Require module source code
        'gridx/support/LinkPager',
        'gridx/modules/Pagination',
        'gridx/modules/pagination/PaginationBar'
    ],
    function (Store, Grid, Cache, SingleSort, ColumnResizer, LinkPager, Pagination, PaginationBar) {

        var gridModel = new Store({
            target: "http://localhost:8080/griddata"
        });

        var columns = [
            {field: 'id', name: 'Identity'},
            {field: 'name', name: 'Name'},
            {field: 'surname', name: 'Surname'},
            {field: 'instrument', name: 'Main Instrument'}
        ];

        grid = new Grid({
            cacheClass: Cache,
            store: gridModel,
            structure: columns,
            // You can add modules here
            // Every module contains a reference to the model and to the grid instance
            // You can access to the each module using gridVariable.moduleName
            modules: [
                SingleSort,
                ColumnResizer,
                Pagination, PaginationBar
            ],
            // You can pass parameters to a single module using the convention moduleNameParameterName
            columnResizerMinWidth: 10,
            paginationInitialPageSize: 10,
            pageSize:10
        }, 'gridNode');

        grid.startup();
    });