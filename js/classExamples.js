/**
 * Created by s.cosma on 26/07/2016.
 */
require(['dojo/_base/declare'], function (declare) {
    /* Declaring a global scope class */
    declare('myGlobalClass.MyClass', null, {
        field: 'field'
    });

    var baseArray = [1,2,3,4];
   var BaseClass = declare(null, {
       fieldA: undefined,
       fieldObj: baseArray,
       methodA: function (value) {
           this.fieldA = value;
       },
       methodToOverride: function (value) {
           console.log(value || 'If I print this, it not works!');
       },
       constructor: function () {
           console.log('Class constructor called!');
       }
   });

    /* obj instances*/
    var objA = new BaseClass();
    var objB = new BaseClass();

    console.assert(objA.fieldObj === objB.fieldObj, "Same objects from prototype");
    objA.fieldObj.push(5);
    console.assert(objA.fieldObj === objB.fieldObj, "Also same objects from prototype");

    objA.fieldObj = ['a', 'b', 'c'];

    console.assert(objA.fieldObj !== objB.fieldObj, "Now I have an instance object in objA and a class object in objB, according to prototype inheritance");
    console.log('objA.fieldObj',objA.fieldObj);
    console.log('objB.fieldObj',objB.fieldObj);
    console.log('old value',objA.fieldA);
    objA.methodA('new Value');
    console.log('new value objA',objA.fieldA);
    console.log('new value objB',objB.fieldA);

    objA.fieldA = 'another Value';
    console.log('another new value objA',objA.fieldA);
    console.log('another new value objB',objB.fieldA);

    /* Testing inheritance */
    var SubClass = declare(BaseClass, {
        fieldB: 'additional field',
        methodB: function () {
            console.log('I am an additional method');
        },
        methodToOverride: function (value) {
            console.log('If I print this, it works!');
            this.inherited(arguments);
        },
        constructor: function () {
          console.log('SubClass constructor called!')
        }
    });

    var subObject = new SubClass();
    console.log('subObject -> fieldA',subObject.fieldA);
    console.log('subObject -> fieldB',subObject.fieldB);
    subObject.methodB();
    subObject.methodToOverride('I also want to call the overridden method, so if you see this, it works properly!');
});