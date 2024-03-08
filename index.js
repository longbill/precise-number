/**
 * npm install precise-number
 * author: Chunlong 
 * https://github.com/longbill/precise-number
 * 2017-07-02
 */

function N(n) {
	return new PNumber(n);
}

class PNumber {

	constructor(n) {
		if (n && n instanceof PNumber) {
			this.number = n.valueOf();
		} else if (typeof n === 'string' || typeof n === 'number') {
			this.number = N.parse(n);
		} else {
			throw new Error('precise-number can only accept string or number type');
		}
	}

	setValue(n) {
		this.number = n;
		return this;
	}

	add(...args) {
		return this.setValue( N.add(this.number, ...args) );
	}

	plus(...args) {
		return this.add(...args);
	}

	sub(...args) {
		return this.setValue( N.sub(this.number, ...args) );
	}

	minus(...args) {
		return this.sub(...args);
	}

	equal(n) {
		return N.equal(this.number, n);
	}

	equals(n) {
		return this.equal(n);
	}

	multiply(...args) {
		return this.setValue(N.multiply(this.number, ...args));
	}

	multi(...args) {
		return this.multiply(...args);
	}

	mul(...args) {
		return this.multiply(...args);
	}

	divide(n) {
		return this.setValue( N.divide(this.number, n) );
	}

	div(n) {
		return this.divide(n);
	}

	toJSON() {
		return this.number;
	}

	toString() {
		return new Exp(this.number).toString();
	}

	valueOf() {
		return new Exp(this.number).toNumber();
	}

	round(decimal) {
		decimal = Math.pow(10, decimal);
		return this.setValue(Math.round( this.number*decimal ) / decimal) * 1;
	}

	floor(decimal) {
		if (!decimal) decimal = 0;
		decimal = Math.pow(10, decimal);
		return this.setValue(Math.floor( this.number*decimal ) / decimal) * 1;
	}

	ceil(decimal) {
		if (!decimal) decimal = 0;
		decimal = Math.pow(10, decimal);
		return this.setValue(Math.ceil( this.number*decimal ) / decimal) * 1;
	}

	toFixed(decimal) {
		return this.floor(decimal).toString();
	}
}


/**
 * N.add( n1, n2 [,n3...])
 * alias: N.plus
 */
N.add = function(...args) {
	let ns = args.map(a => new Exp(a));
	let minE = Math.min.apply(null, ns.map(v => v.e));
	ns = ns.map(n => n.evolveTo(minE));
	let n = ns.reduce((acc, n) => acc + n.n, 0n);
	return new Exp(n, minE).toNumber();	
};

/**
 * alias: N.minus
 */
N.sub = function(...args) {
	args = args.map((v, i) => {
		return i === 0 ? v : -v;
	});
	return N.add(...args);
};

N.equal = function(a, b) {
	return Math.abs( N.parse(a) - N.parse(b) ) < 1e-100;
};

/**
 * N.multiply(n1, n2 [, n3 ...])
 * alias: N.mul, N.multi
 */
N.multiply = function(...args) {
	return args.map(a => new Exp(a)).reduce((a, b) => {
		a.n *= b.n;
		a.e += b.e;
		return a;
	}, new Exp(1)).toNumber();
};

N.divide = function(a, b) {
	let v1 = new Exp(a);
	let v2 = new Exp(b);
	return new Exp(Number(v1.n) / Number(v2.n), v1.e - v2.e).toNumber();
};

N.parse = function(n, decimal) {
	if (!n || !n.toString || (isNaN(n) && typeof n === 'number')) return 0;
	let en = new Exp(n);
	if (decimal === undefined) return en.toNumber();
	n = en.toNumber();
	let p = Math.pow(10, decimal);
	return Math.floor(n * p) / p;
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
N.dividedBy = N.div;

//calculate the decimal part length of a number
function decimalLength(n) {
	let ns = cleanNumber(n).toString();
	let ems = ns.match(/e([\+\-]\d+)$/);
	let e = 0;
	if (ems && ems[1]) e = parseInt(ems[1]);
	ns = ns.replace(/e[\-\+]\d+$/, '');	
	let parts = ns.split('.', 2);
	if (parts.length === 1) return -e;
	return parts[1].length - e;
}

//remove , space from a string number
function cleanNumber(r) {
	if (typeof r === 'string') return r.replace(/\,|\s/g,'');
	return r;
}

class Exp {
	constructor(n, _e) {

		if (n && n instanceof Exp) {
			this.n = n.n;
			this.e = n.e;
			return this;
		}

		let ns = cleanNumber(n.toString());
		let ems = ns.match(/e([\+\-]\d+)$/);
		let e = 0;
		if (_e !== undefined) e = parseInt(_e, 10);

		if (ems && ems[1]) e = parseInt(ems[1]);
		ns = ns.replace(/e[\-\+]\d+$/, '');	
		let parts = ns.split('.', 2);
		if (parts.length === 1) {
			this.n = BigInt(parts[0]);
			this.e = e;
		} else {
			ns = ns.replace('.', '').replace(/^0+/, '');
			while(ns.length > 16 || ns[ns.length -1 ] === '0') {
				e++;
				ns = ns.substr(0, ns.length - 1);
			}
			this.n = BigInt(ns);
			this.e = e - parts[1].length;
		}
	}

	evolve(n) {
		this.n = this.n * (10n ** BigInt(n));
		this.e -= n;
		return this;
	}

	evolveTo(n) {
		return this.evolve(this.e - n);
	}

	toNumber() {
		let n = this.n;
		if (String(n).length >= 16) {
			let len = String(n).length;
			n = String(n).substr(0, 16);
			n = Number(String(n).padEnd(len, '0'));
		}
		return Number(this.toString());
	}

	toString() {
		let minus = (this.n < 0n);
		if (minus) this.n = -this.n;
		let s = this.movePoint(String(this.n), this.e);
		while(s.length > 16 && s.indexOf('.') !== -1) {
			s = s.substr(0, s.length - 1);
		}
		return (minus ? '-' : '') + s;
	}

	movePoint(s, n) {
		if (s.indexOf('.') === -1) s = s + '.0';
		for (let i = 0; i <= Math.abs(n); i++) s = '0' + s + '0';
		let pos = s.indexOf('.');
		s = s.replace('.', '');
		pos += n;
		s = s.slice(0, pos) + '.' + s.slice(pos);
		s = s.replace(/^[0]+|[0]+$/g, '');
		if (s.match(/^\./)) return '0' + s;
		if (s.match(/\.$/)) return s.replace('.', '');
		return s;
	}
}


N.decimalLength = decimalLength;
N.cleanNumber = cleanNumber;
N.Exp = Exp;
module.exports = N;