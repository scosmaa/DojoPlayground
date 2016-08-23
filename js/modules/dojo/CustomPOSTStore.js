/**
 * Created by s.cosma on 23/08/2016.
 */
define(["dojo/request", "dojo/_base/lang", "dojo/json", "dojo/_base/declare", "dojo/store/util/QueryResults" /*=====, "./api/Store" =====*/
], function(request, lang, JSON, declare, QueryResults /*=====, Store =====*/){

    return declare(null, {
        // summary:
        //		This is a store used to communicating with a server through JSON
        //		formatted data using post method. It implements dojo/store/api/Store.

        constructor: function(options){
            this.headers = {};
            declare.safeMixin(this, options);
        },

        // headers: Object
        //		Additional headers to pass in all requests to the server. These can be overridden
        //		by passing additional headers to calls to the store.
        headers: {},

        // accepts: String
        //		Defines the Accept header to use on HTTP requests
        accepts: "application/javascript, application/json",

        // target: String
        //		The target base URL to use for all requests to the server. This string will be
        //		prepended to the id to generate the URL (relative or absolute) for requests
        //		sent to the server
        target: "",

        // idProperty: String
        //		Indicates the property to use as the identity property. The values of this
        //		property should be unique.
        idProperty: "id",

        getMethodName: 'get',

        putMethodName: 'put',

        addMethodName: 'put',

        get: function(id, options){
            // summary:
            //		Retrieves an object by its identity. This will trigger a POST request to the server using
            //		the url `this.target + this.getMethodName`.
            // id: Number
            //		The identity to use to lookup the object
            // options: Object?
            //		HTTP headers. For consistency with other methods, if a `headers` key exists on this object, it will be
            //		used to provide HTTP headers instead.
            // returns: Object
            //		The object in the store that matches the given id.
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

        getIdentity: function(object){
            // summary:
            //		Returns an object's identity
            // object: Object
            //		The object to get the identity from
            // returns: Number
            return object[this.idProperty];
        },

        put: function(object, options){
            // summary:
            //		Stores an object. This will trigger a PUT request to the server
            //		if the object has an id, otherwise it will trigger a POST request.
            // object: Object
            //		The object to store.
            // options: __PutDirectives?
            //		Additional metadata for storing the data.  Includes an "id"
            //		property if a specific id is to be used.
            // returns: dojo/_base/Deferred
            options = options || {};
            object.id = object.id || options.id;
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
            return request.post([this.target,this.putMethodName].join('/'), {
                data: JSON.stringify(object),
                handleAs: "json",
                headers: headers
            });
        },

        add: function(object, options){
            // summary:
            //		Adds an object. This will trigger a PUT request to the server
            //		if the object has an id, otherwise it will trigger a POST request.
            // object: Object
            //		The object to store.
            // options: __PutDirectives?
            //		Additional metadata for storing the data.  Includes an "id"
            //		property if a specific id is to be used.
            options = options || {};
            object.id = object.id || options.id;
            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers || options);
            return request.post([this.target,this.addMethodName].join('/'), {
                data: JSON.stringify(object),
                handleAs: "json",
                headers: headers
            });
        },

        remove: function(id, options){
            // summary:
            //		Deletes an object by its identity. This will trigger a DELETE request to the server.
            // id: Number
            //		The identity to use to delete the object
            // options: __HeaderOptions?
            //		HTTP headers.
            options = options || {};
            return xhr("DELETE", {
                url: this.target + id,
                headers: lang.mixin({}, this.headers, options.headers)
            });
        },

        query: function(query, options){
            // summary:
            //		Queries the store for objects. This will trigger a GET request to the server, with the
            //		query added as a query string.
            // query: Object
            //		The query to use for retrieving objects from the store.
            // options: __QueryOptions?
            //		The optional arguments to apply to the resultset.
            // returns: dojo/store/api/Store.QueryResults
            //		The results of the query, extended with iterative methods.
            options = options || {};

            var headers = lang.mixin({ Accept: this.accepts }, this.headers, options.headers);

            if(options.start >= 0 || options.count >= 0){
                headers.Range = headers["X-Range"] //set X-Range for Opera since it blocks "Range" header
                    = "items=" + (options.start || '0') + '-' +
                    (("count" in options && options.count != Infinity) ?
                        (options.count + (options.start || 0) - 1) : '');
            }
            var hasQuestionMark = this.target.indexOf("?") > -1;
            if(query && typeof query == "object"){
                query = xhr.objectToQuery(query);
                query = query ? (hasQuestionMark ? "&" : "?") + query: "";
            }
            if(options && options.sort){
                var sortParam = this.sortParam;
                query += (query || hasQuestionMark ? "&" : "?") + (sortParam ? sortParam + '=' : "sort(");
                for(var i = 0; i<options.sort.length; i++){
                    var sort = options.sort[i];
                    query += (i > 0 ? "," : "") + (sort.descending ? '-' : '+') + encodeURIComponent(sort.attribute);
                }
                if(!sortParam){
                    query += ")";
                }
            }
            var results = xhr("GET", {
                url: this.target + (query || ""),
                handleAs: "json",
                headers: headers
            });
            results.total = results.then(function(){
                var range = results.ioArgs.xhr.getResponseHeader("Content-Range");
                return range && (range = range.match(/\/(.*)/)) && +range[1];
            });
            return QueryResults(results);
        }
    });

});