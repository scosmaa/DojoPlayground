/**
 * Created by s.cosma on 23/08/2016.
 */
define(
    [
        'dojo/store/util/QueryResults',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/request',
        'dojo/store/util/SimpleQueryEngine'
    ], function (
        QueryResults,
        declare,
        lang,
        request,
        // Permette di manipolare in maniera agevole un array con funzioni quali ordinamento, paginazione, filtro, ecc.
        SimpleQueryEngine
    ) {
        return declare(null, {
            data: [],
            index: {},
            idProperty: 'id',
            queryEngine: SimpleQueryEngine,

            constructor: function (options) {
                lang.mixin(this, options || {});
                this.setData(this.data || {});
            },
            // La funzione query deve restituire SEMPRE un oggetto di tipo QueryResults che arricchisce il risultato con metodi comuni ad un array (forEach, ...)
            query: function (query, options) {
                return QueryResults(
                    (this.queryEngine(query, options)(this.data))
                )
            },

            setData: function (data) {
                this.data = data;
                var that = this;
                // Creo un dizionario indicizzato per la chiave identificativa
                this.data.forEach(function(element) {
                    that.index[element[that.idProperty]] = element;
                })
            },

            get: function(id){
                return this.index[id];
            },

            getIdentity: function(object){
                return object[this.idProperty];
            },

            put: function(object, options){
                var id = options && options.id ||
                        object[this.idProperty];

                this.index[id] = object;

                for(var i = 0; i< this.data.length; i++){
                    if(this.data[i][this.idProperty] === id){
                        this.data[i] = object;
                        return id;
                    }
                }
                this.data.push(object);
                return id;
            },

            add: function(object, options){
                var id = options && options.id ||
                    object[this.idProperty];

                if(this.index[id]){
                    throw new Error('Ops! è un doppione!')
                }

                this.put(object, options);
            },
            remove: function(id){
                delete this.index[id];
                for(var i = 0, l = this.data.length; i < l; i++){
                    if(this.data[i][this.idProperty] == id){
                        this.data.splice(i, 1);
                        return;
                    }
                }
            }
        })

    }
);