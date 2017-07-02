const equal = require('assert').strictEqual;
const N = require('./')


//test add
equal( N.add(1, 2), 3 );
equal( N.add(1, 2, 3, 4, 5, 6.1), 21.1 );
equal( N.add(1.11, 1.11), 2.22 );
equal( N.add('100,102.11', 1.111), 100103.221 );
equal( N.add(0.000001, 1.0000001), 1.0000011 );
equal( N.add(9.99, -2.11), 7.88 );

//test minus
equal( N.sub(1,2), -1);
equal( N.sub(1.11,1.11), 0);
equal( N.sub('100,102.11',1.111), 100100.999);

//multiply
equal( N.multi(1,2), 2);
equal( N.multi(1.11,1.11), 1.2321);
equal( N.multi('100,102.11', 1.11), 111113.3421);

//division
equal( N.div(1, 2), 0.5);
equal( N.div(1.11, 1.11), 1);
equal( N.div(1, 3), 0.3333333333333333);
equal( N.div('100,102.11', 2), 50051.055);


console.log('all passed');