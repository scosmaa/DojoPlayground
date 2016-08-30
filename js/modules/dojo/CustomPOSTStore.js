/**
 * Created by s.cosma on 23/08/2016.
 */
define(["dojo/request", "dojo/_base/lang", "dojo/json", "dojo/_base/declare", "dojo/store/util/QueryResults", "dojo/Deferred" /*=====, "./api/Store" =====*/
], function(request, lang, JSON, declare, QueryResults, Deferred /*=====, Store =====*/){

    return declare(null, {
        // summary:
        //		Questo store rappresenta un POC da utilizzare con gridX. Utilizza il verbo POST
        //      per effettuare le chiamate lato server. Tutti i parametri (id della get, filtraggio, ordinamento)
        //      sono passati "temporaneamente" nel body della richiesta.

        constructor: function(options){
            this.headers = {};
            declare.safeMixin(this, options);
        },

        // Eventuali header addizionali da passare al server
        headers: {},

        // accepts: String
        //		Campo Accept dell'header (tipi di risposte accettate)
        accepts: "application/javascript, application/json",

        // target: String
        //		Il base path per effettuare le chiamate lato server
        target: "",

        // idProperty: String
        //		Nome del campo che contiene l'identificativo univoco degli oggetti dell'array
        idProperty: "id",

        //  Metodi che  vengono chiamati lato server in base all'operazione da effettuare (concatenazione con target)
        /*  TODO POC: attualmente PUT/ADD fanno la stessa cosa. In realtà il put dovrebbe modificare se esistente, aggiungere
            se nuovo. L'add fa solo l'aggiunta
        */
        getMethodName: 'get',
        putMethodName: 'put',
        addMethodName: 'put',
        removeMethodName: 'remove',
        queryMethodName: 'query',

        get: function(id, options){
            // summary:
            //		Restituisce un oggetto in base all'id in input
            // id: Number
            //		Identificativo dell'oggetto
            // options: Object?
            //		Lasciato perché presente in tutti gli store analizzati.
            // returns: Object
            //		L'oggetto con l'id corrispondente.
            options = options || {};
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
            return request.post([this.target,this.getMethodName].join('/'), {
                handleAs: "json",
                headers: headers,
                data: {
                    id: id
                }
            });
        },

        // Restituisce l'identificativo del cliente in base al campo corrispondente
        getIdentity: function(object){
            return object[this.idProperty];
        },

        // Modifica un oggetto se esistente o ne inserisce uno nuovo
        // Restituisce un oggetto deferred
        put: function(object, options){
            options = options || {};
            object.id = object.id || options.id;
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
            return request.post([this.target,this.putMethodName].join('/'), {
                data: JSON.stringify(object),
                handleAs: "json",
                headers: headers
            });
        },

        // Modifica un oggetto se esistente o ne inserisce uno nuovo
        // Restituisce un oggetto deferred
        // TODO: dovrebbe solo aggiungere oggetti nuovi
        add: function(object, options){
            options = options || {};
            object.id = object.id || options.id;
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
            return request.post([this.target,this.addMethodName].join('/'), {
                data: JSON.stringify(object),
                handleAs: "json",
                headers: headers
            });
        },

        // Rimuove l'oggetto all'interno dello store in base all'id in input
        remove: function(id, options){
            options = options || {};
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);

            return request.post([this.target,this.removeMethodName].join('/'), {
                data: {
                    id: id || options.id
                },
                handleAs: "json",
                headers: headers
            });
        },

        //  Metodo fondamentale di uno store.
        //  Si occupa di contattare il server per le operazioni di filtraggio, ordinamento (multiplo)
        //  paginazione, ecc.
        query: function(query, options){
            // Contiene i parametri che servono al server per la manipolazione dei dati
            var POSTParams = {};
            options = options || {};

            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers);

            // Filtro
            if(query.data){
                POSTParams.filterData = JSON.stringify(query.data);
            }

            // Ordinamento multiplo
            if(options && options.sort){
                POSTParams.sortParams = [];
                for(var i = 0; i<options.sort.length; i++){
                    var sort = options.sort[i];
                    POSTParams.sortParams.push(sort);
                }
            }

            // Paginazione
            if(options.start >= 0 || options.count >= 0){
                POSTParams.start = options.start || 0;
                // Forse options count viene valorizzato anche con Infinity
                POSTParams.end = options.count + POSTParams.start;
                POSTParams.count = options.count ;
            }

            var deferred = new Deferred();

            var results = request.post([this.target,this.queryMethodName].join('/'), {
                    data: POSTParams,
                    handleAs: "json",
                    headers: headers
                });

            deferred.total = results.then(function(res){
                deferred.resolve(res.data);
                return res.total;
            });

            return QueryResults(deferred);
        }
    });
});