/**
 * npm install precise-number
 * author: Chunlong (jszen.com)
 * 2017-07-02
 */

let N = {

	/**
	 * N.add( n1, n2 [,n3...])
	 * alias: N.plus
	 */
	add(...args) {
		let m = Math.pow(10, Math.max(...args.map(r=>decimalLength(r))));
		return sum(...args.map(cleanNumber).map(r=>Math.round( r*m ))) / m;
	},

	/**
	 * alias: N.minus
	 */
	sub(...args) {
		return N.add(...args.map(cleanNumber).map((n, i)=>( (i > 0) ? -1 : 1 ) * n));
	},

	equal(a, b) {
		return Math.abs( N.parse(a) - N.parse(b) ) < 1e-100;
	},

	/**
	 * N.multiply(n1, n2 [, n3 ...])
	 * alias: N.mul, N.multi
	 */
	multiply(...args) {
		return args.map(cleanNumber).reduce((a, b) => {
			return toInt(a) * toInt(b);
		}, 1) / Math.pow(10, sum(...args.map(r=>decimalLength(r))));
	},

	divide(a, b) {
		return (toInt(a) / toInt(b)) * Math.pow(10, decimalLength(b) - decimalLength(a));
	},

	parse(n, decimal) {
		if (!n || !n.toString || isNaN(n)) return 0;
		n = cleanNumber(n);
		if (decimal === undefined) return n*1;
		let p = Math.pow(10, decimal);
		return Math.round(n * p) / p;
	}

};

//make aliases
N.plus = N.add;
N.sumOf = N.add;
N.minus = N.sub;
N.equals = N.equal;
N.mul = N.multiply;
N.multi = N.multiply;
N.productOf = N.multiply;
N.div = N.divide;

//calculate the decimal part length of a number
function decimalLength(n) {
	let parts = cleanNumber(n).toString().split('.', 2);
	if (parts.length === 1) return 0;
	return parts[1].length;
}

//pure number sum
function sum(...args) {
	return args.reduce((acc, n) => {
		return acc+=n;
	}, 0);
}

//remove , space from a string number
function cleanNumber(r) {
	if (typeof r === 'string') return r.replace(/\,|\s/g,'');
	return r;
}

// decimal to int
function toInt(n) {
	return Number( cleanNumber(n).toString().replace('.', '') );
}

N.decimalLength = decimalLength;
N.cleanNumber = cleanNumber;

module.exports = N;