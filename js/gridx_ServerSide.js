/**
 * Created by s.cosma on 27/07/2016.
 * This https://xcellerant.net/gridx-in-xpages/ contains useful info about gridX
 */
require([
        'dojo/store/JsonRest',
        'gridx/Grid',
        'gridx/core/model/cache/ASync',
        'gridx/modules/SingleSort', //Require module source code
        'gridx/modules/ColumnResizer',   //Require module source code
        'gridx/support/LinkPager',
        'gridx/modules/Pagination',
        'gridx/modules/pagination/PaginationBar',
        "gridx/modules/Filter",
        "gridx/modules/filter/QuickFilter"
    ],
    function (Store, Grid, Cache, SingleSort, ColumnResizer, LinkPager, Pagination, PaginationBar, Filter, QuickFilter) {

        var gridModel = new Store({
            headers: {'cache-control' : 'no-cache'},
            target: "http://localhost:8080/griddata"
        });

        var columns = [
            {field: 'id', name: 'Identity'},
            {field: 'name', name: 'Name', sortable: false},
            {field: 'surname', name: 'Surname', sortable: false},
            {field: 'instrument', name: 'Main Instrument', sortable: false}
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
                Pagination,
                PaginationBar,
                Filter,
                QuickFilter
            ],
            // You can pass parameters to a single module using the convention moduleNameParameterName
            columnResizerMinWidth: 10,
            paginationInitialPageSize: 10,
            pageSize: 10,
            cacheSize: 10, /* WARNING: If the cacheSize = 0  add 'cache-control' : 'no-cache' in the headers field of data store*/
            filterServerMode: true
        }, 'gridNode');

        grid.startup();
    });