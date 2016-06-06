'use strict'

let _ = require('lodash');

let Settings = require('./app/classes/Settings.js');


module.exports = function (bot_name) {
	let data = require(`../../configs/${bot_name}.json`);
	_.forEach(data, (value, key) => Settings.setItem(key, value));
};
