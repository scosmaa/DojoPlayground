/**
 * Created by s.cosma on 23/08/2016.
 */
require([
    'custom/CustomPOSTStore'
], function (CustomStore) {
    store =  new CustomStore({
        target: 'http://localhost:8081'
    });
    store.get(99).then(function (elem) {
        console.log(elem);
    });
    var i = 1000;
    store.put({id: i, name: 'Name ' + i, surname: 'Surname ' + i, instrument: 'Instrument '+ i}).then(function (elem) {
        console.log(elem);
    });

    store.put({id: 99, name: 'Name aaaaa', surname: 'Surname bbbbb', instrument: 'Instrument ccccc'}).then(function (elem) {
        console.log(elem);
    });
});