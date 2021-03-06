# Perform plus, minus, multiply and division algorithms precisely using javascript

## Why?

In pure javascript `1.1*1.1 === 1.2100000000000002` is true! 

## Install

```
npm install precise-number --save
```

## Methods

```
const N = require('precise-number');

N.add( n1, n2 [,n3...]) //alias N.plus

N.sub( n1, n2 )  //alias N.minus

N.multiply(n1, n2 [, n3 ...])  //alias N.mul, N.multi, N.productOf

N.divide(n1, n2) //alias N.div N.dividedBy

N.parse(number_string, decimal) //string to number with decimals

```

## Chain
```
N(1).add(2).multi(3).valueOf() === 9
N(1).add(2).multi(3) + 0 === 9
N(1).add(2).multi(3) * 1 === 9
N(1).add(2).multi(3) !== 9

```

## Tests

```

//add
N.add(1, 2) === 3
N.add(1, 2, 3, 4, 5, 6.1) === 21.1
N.add(1.11, 1.11) === 2.22
N.add('100,102.11', 1.111) === 100103.221
N.add(0.000001, 1.0000001) === 1.0000011
N.add(9.99, -2.11) === 7.88

//minus
N.sub(1,2), -1);
N.sub(1.11,1.11), 0);
N.sub('100,102.11',1.111), 100100.999);

//multiply
N.multi(1,2) === 2
N.multi(1.11,1.11) === 1.2321
N.multi('100,102.11', 1.11) === 111113.3421

//division
N.div(1, 2) === 0.5
N.div(1.11, 1.11) === 1
N.div(1, 3) === 0.3333333333333333
N.div('100,102.11', 2) === 50051.055

//chain
N(1).multi(8.2).add(0.8).div(3) * 1 === 3

N.div(0.000000000123, 0.0000000001) === 1.23

N(1.23e-10).toString() === '0.000000000123'
N(1e+22).toString() === '10000000000000000000000'
```