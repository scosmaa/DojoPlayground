/**
 * Created by s.cosma on 27/07/2016.
 */
require([
        'dojo/store/Memory',
        'gridx/Grid',
        'gridx/core/model/cache/Sync'
    ],
    function (Store, Grid, Cache) {

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

        var grid = new Grid({
            cacheClass: Cache,
            store: gridModel,
            structure: columns
        }, 'gridNode');

        grid.startup();
    });