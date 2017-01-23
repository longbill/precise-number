'use strict';


let methods = {

	/**
	 * N.add( n1, n2 [,n3...])
	 * alias: N.plus
	 */
	add: function() {
		let args = Array.from(arguments).map(r=>{
			if (typeof r === 'string') return r.replace(/\,|\s/g,'');
			return r;
		});
		let rs = [],m,s=0;
		args.map(r=>{
			let arr = r.toString().split('.');
			rs.push( (arr.length > 1) ? arr[1].length : 0 );
		});
		m = Math.pow(10,Math.max.apply(null,rs));
		args.map(r=>{
			s += Math.round(r*m);
		});
		return s/m;
	},

	/**
	 * alias: N.minus
	 */
	sub: function(arg1,arg2) {
		return this.add(arg1,-1*arg2);
	},

	equal: function(a, b) {
		return Math.abs( this.parse(a) - this.parse(b) ) < 1e-100;
	},

	/**
	 * N.multiply(n1, n2 [, n3 ...])
	 * alias: N.mul, N.multi
	 */
	multiply: function() {
		let args = Array.from(arguments), m=0;
		args.map(r=>{
			let arr = r.toString().split('.');
			m += (arr.length > 1) ? arr[1].length : 0;
		});
		return args.reduce(function(a,b){
			return Number(a.toString().replace(/\,|\./g,''))*Number(b.toString().replace(/\,|\./g,''));
		},1)/Math.pow(10, m);
	},


	divide: function(arg1,arg2) {
		var t1=0,t2=0,r1,r2;
		try{t1=arg1.toString().split(".")[1].length}catch(e){}
		try{t2=arg2.toString().split(".")[1].length}catch(e){}
		r1=Number(arg1.toString().replace(/\,|\./g,""))
		r2=Number(arg2.toString().replace(/\,|\./g,""))
		return (r1/r2)*Math.pow(10,t2-t1);
	},

	parse(n, decimal) {
		if (!n || !n.toString || isNaN(n)) return 0;
		n = n.toString().replace(/\,/g,'');
		if (decimal === undefined) return n*1;
		let p = Math.pow(10, decimal);
		return Math.round(n*p)/p;
	}

};

methods.plus = methods.add;
methods.minus = methods.sub;
methods.mul = methods.multiply;
methods.multi = methods.multiply;
methods.div = methods.divide;

module.exports = methods;
