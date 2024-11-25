const equal = require('assert').strictEqual;
const N = require('./');

//test add
equal( N(1).add(2).valueOf(), 3);
equal( N(100000000000000000000).add(200000000000000000000).valueOf(), 300000000000000000000);
equal( N(1).add(2).add(3).add(4).add(5).add(6.1).valueOf(), 21.1);
equal( N(1.11).add(1.11)+0, 2.22);
equal( N(1.11).add(1.11)*1, 2.22);
equal( N.add(1, 2), 3 );
equal( N.add(1, 2, 3, 4, 5, 6.1), 21.1 );
equal( N.add(1.11, 1.11), 2.22 );
equal( N.add('100,102.11', 1.111), 100103.221 );
equal( N.add(0.000001, 1.0000001), 1.0000011 );
equal( N.add(9.99, -2.11), 7.88 );

//test minus
equal( N(1).sub(2) + 1, 0);
equal( N(1.11).sub(1.11) + 0, 0);
equal( N('100,102.11').sub(1.111) - 100100.999, 0);

equal( N.sub(1,2), -1);
equal( N.sub(1.11,1.11), 0);
equal( N.sub('100,102.11',1.111), 100100.999);

//multiply
equal( N(1).multi(2) - 2, 0);
equal( N.multi(1,2), 2);
equal( N.multi(1.11,1.11), 1.2321);
equal( N.multi('100,102.11', 1.11), 111113.3421);

//division
equal( N(1.11).divide(1.11) - 1, 0);
equal( N.div(1, 2), 0.5);
equal( N.div(1.11, 1.11), 1);
equal( N.div(1, 3), 0.33333333333333);
equal( N.div('100,102.11', 2), 50051.055);

equal( N.div(0.000000000123, 0.0000000001), 1.23);

equal( N(139.89).floor(2), 139.89);
equal( N(139.89).ceil(2), 139.89);
equal( N(139.89).round(2), 139.89);
equal( N(139.89).floor(1), 139.8);
equal( N(139.89).ceil(1), 139.9);
equal( N(139.89).round(1), 139.9);

equal( N.parse(139.89, 2), 139.89);

equal( N(1).multi(8.2).add(0.8).div(3) * 1, 3);

equal( N.div(2.4, 2),  1.2);

equal( N(1.233).round(2), 1.23);

equal( N(1.23e-10).toString(), '0.000000000123');
equal( N('1.23e-10').toString(), '0.000000000123');
equal( N(1e+22).toString(), '10000000000000000000000');

//test parse
let a = '1234567890123.3998999';
console.log('Number(', a, ') =', Number(a));
console.log('N.parse(', a, ') =', N.parse(a));

equal(N.parse(a), 1234567890123.39);

equal(N('0.000048419454144098404').multiply(0.0000651).toString(), '0.0000000031521');

equal( N(0.317481).minus(0.32226848207515) * 1, -0.00478748207515);

a = 3.535e-9;
let b = 36000000000;
equal( N(a).multiply(b).div(b).toString(), N(a).toString());

console.log('all passed');