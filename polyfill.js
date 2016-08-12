if (typeof Promise !== 'function') {
	throw new TypeError('A global Promise is required');
}

if (typeof Promise.try !== 'function') {
	Promise.try = function try(func) {
		if (typeof this !== 'function') {
			throw new TypeError('Receiver must be a constructor');
		}
		return new this(function (resolve) {
			resolve(func());
		});
	};
}
