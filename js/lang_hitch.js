/**
 * Created by s.cosma on 30/08/2016.
 */
require([
    'dojo/_base/lang'
], function(lang) {
    var obj1 = {
        foo: 'aaa',
        print: function() {
            return 'il valore è ' + this.foo
        }
    };

    var obj2 = {
        print: obj1.print
    };

    var obj3 = {
        foo: 'obj3'
    };
    console.log('obj1',obj1.print());
    console.log('obj2',obj2.print());

    obj2.print = lang.hitch(obj3, obj2.print);

    console.log('hitch',obj2.print());

    var concatenate_params = function(a,b,c) {
        return [a,b,c].join('-');
    };

    obj2.print = lang.partial(concatenate_params,'a','b','c');

    console.log('partial',obj2.print());

});