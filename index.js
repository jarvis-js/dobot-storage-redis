var redis = require('redis');

module.exports = RedisStorage;

function RedisStorage(options) {
	var defaults = {
		hostname: 'localhost',
		port: 6379,
		password: null,
		key_prefix: 'dobot:storage:'
	};

	this.options = defaults;
	for (var key in options) {
		this.options[key] = options[key];
	}

	this.connection = null;
}

RedisStorage.prototype.init = function(callback) {
	this.connection = redis.createClient(this.options.port, this.options.hostname);
	if (this.options.password) {
		this.connection.auth(this.options.password);
	}
	if (typeof callback === 'function') {
		callback();
	}
};

RedisStorage.prototype.load = function(key, callback) {
	this.connection.get(this.options.key_prefix + key, function(error, data) {
		var loaded = null;
		if (!error) {
			try {
				loaded = JSON.parse(data);
			}
			catch (e) {
				// Not the end of the world.
			}
		}
		if (typeof callback === 'function') {
			callback(loaded);
		}
	});
};

RedisStorage.prototype.save = function(key, data, callback) {
	this.connection.set(this.options.key_prefix + key, JSON.stringify(data));
	if (typeof callback === 'function') {
		callback();
	}
};
