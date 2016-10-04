'use strict';

var assert = require('assert');

var P = require('./promise');
var adapter = require('./adapter');

var someRejectionReason = { message: 'some rejection reason' };
var anotherReason = { message: 'another rejection reason' };

describe('mocha promise sanity check', () => {
  it('passes with a resolved promise', () => {
    return P.resolve(3);
  });

  it('passes with a rejected then resolved promise', () => {
    return P.reject(someRejectionReason).catch(x => 'this should be resolved');
  });
});

const testCases = (TestedPromise) => {
	it('returns an instance', () => {
		const promise = TestedPromise.try();
		assert(promise instanceof P);
		assert(promise instanceof TestedPromise);
	});

	it('calls the function synchronously', () => {
		let called = false;
		TestedPromise.try(() => { called = true; });
		assert.strictEqual(called, true);
	});

	describe('fulfills the promise when the callback completes normally', () => {
		it('resolves when it returns a non-promise', (done) => {
			const value = {};
			TestedPromise.try(() => value).then((x) => {
				assert.strictEqual(x, value);
				done();
			});
		});

		it('resolves when it returns a resolved promise', (done) => {
			const value = {};
			const promise = TestedPromise.resolve(value);
			TestedPromise.try(() => promise).then((x) => {
				assert.strictEqual(x, value);
				done();
			});
		});

		it('rejects when it returns a rejected promise', (done) => {
			const value = {};
			const promise = TestedPromise.reject(value);
			TestedPromise.try(() => promise).then(null, (reason) => {
				assert.strictEqual(reason, value);
				done();
			});
		});
	});

	it('rejects the promise when the callback throws', (done) => {
		const value = {};
		TestedPromise.try(() => { throw value; }).then(null, (reason) => {
			assert.strictEqual(reason, value);
			done();
		});
	});
};

describe('try', () => testCases(P));
describe('try: alternate constructor', () => testCases(class SubPromise extends P {}))
