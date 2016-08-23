/**
 * Created by s.cosma on 23/08/2016.
 */
require([
    'custom/CustomStore'
], function (CustomStore) {
   store =  new CustomStore({
       data: [
           {id: 1, value : 'one'},
           {id: 2, value : 'two'},
           {id: 3, value : 'three'},
           {id: 4, value : 'four'}
       ]
   });

    console.log('Tutti gli elementi usando query()', store.query({},{}));
    console.log('Simulo la paginazione utilizzando query()', store.query({},{sort:1, count:2}));
    console.log('Simulo l\'ordinamento utilizzando query()', store.query({},{sort: [{attribute: 'id', descending: true}]}));
    var elem = store.get(2);
    console.log('get(2)', elem);
    console.log('get(2)', store.getIdentity(elem));

    store.add({id: 10, value: 'ten'});
    console.log('Tutti gli elementi dopo l\'add', store.query({},{}));
    store.put({id: 10, value: 'TEN'});
    console.log('Tutti gli elementi dopo la put', store.query({},{}));
    store.remove(10);
    console.log('Tutti gli elementi dopo la remove', store.query({},{}));
});