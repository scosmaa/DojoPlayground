/**
 * Created by s.cosma on 27/07/2016.
 */
require([
        'dojo/store/Memory',
        'gridx/Grid',
        'gridx/core/model/cache/Sync',
        'gridx/modules/SingleSort', //Require module source code
        'gridx/modules/ColumnResizer'   //Require module source code
    ],
    function (Store, Grid, Cache, SingleSort, ColumnResizer) {

        var beatles = [
            {id: 1, name: 'John', surname: 'Lennon', instrument: 'Guitar'},
            {id: 2, name: 'Paul', surname: 'McCartney', instrument: 'Bass'},
            {id: 3, name: 'George', surname: 'Harrison', instrument: 'Guitar'},
            {id: 4, name: 'Ringo', surname: 'Starr', instrument: 'Drums'}
        ];

        var gridModel = new Store({
            data: beatles
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
                ColumnResizer
            ],
            // You can pass parameters to a single module using the convention moduleNameParameterName
            columnResizerMinWidth: 10
        }, 'gridNode');

        grid.startup();

        // Some basic API operations

        console.log('Row', grid.row(1));
        console.log('Row id', grid.row(1).id);

        console.log('Cell content', grid.cell(0,0).data);

        console.log('Column', grid.column(1));
        console.log('Column Name', grid.column(1).name);

        // columns.pop();
        //
        // grid.setColumns(columns);

        // You can customize a module creating a new one with the same moduleName. Pay attention to respect the same API set
        // A module can depend on other modules

    });