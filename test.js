'use strict';
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const N = require('./index.js')

describe('test', function(){
	it('should perform add', function(done){
		expect(N.add(1,2).toString()).to.equal('3');
		expect(N.add(1.11,1.11).toString()).to.equal('2.22');
		expect(N.add('100,102.11',1.111).toString()).to.equal('100103.221');
		expect(N.add(0.000001,1.0000001).toString()).to.equal('1.0000011');
		expect(N.add(9.99,-2.11).toString()).to.equal('7.88');
		done();
	});
	it('should perform minus', function(done){
		expect(N.sub(1,2).toString()).to.equal('-1');
		expect(N.sub(1.11,1.11).toString()).to.equal('0');
		expect(N.sub('100,102.11',1.111).toString()).to.equal('100100.999');
		done();
	});
	it('should perform multiply', function(done){
		expect(N.multi(1,2).toString()).to.equal('2');
		expect(N.multi(1.11,1.11).toString()).to.equal('1.2321');
		expect(N.multi('100,102.11',1.11).toString()).to.equal('111113.3421');
		done();
	});
	it('should perform division', function(done){
		expect(N.div(1,2).toString()).to.equal('0.5');
		expect(N.div(1.11,1.11).toString()).to.equal('1');
		expect(N.div(1,3).toString()).to.equal('0.3333333333333333');
		expect(N.div('100,102.11',2).toString()).to.equal('50051.055');
		done();
	});
})