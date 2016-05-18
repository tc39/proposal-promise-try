if (typeof Promise !== 'function') {
	throw new TypeError('A global Promise is required');
}

if (typeof Promise.try !== 'function') {
	Promise.try = function try(func) {
		return new Promise(function (resolve) {
			resolve(func());
		});
	};
}
