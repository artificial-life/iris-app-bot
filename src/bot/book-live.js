'use strict'

let _ = require('lodash');

let Settings = require('./app/classes/Settings.js');
let boot = require('./boot.js')('book-live');

let app = require('./app/app.js');


let services = _.castArray(Settings.getItem('service'));
let pickService = function () {
	let index = _.floor(Math.random() * services.length)
	return services[index];
};

let iterations = 0;
let interval_id = false;

let doFn = function (ws, interval, count) {
	interval_id = setInterval(() => {
		iterations++;
		ws.confirm({
			service: pickService(),
			service_count: Settings.getItem('service_count')
		}, true).then((d) => {
			console.log('PIN:', d.ticket.code);
		});

		if (iterations == count) {
			clearInterval(interval_id);
			// process.exit();
		}
	}, interval);
}

app.then((ws) => {
	doFn(ws, Settings.getItem('interval'), Settings.getItem('iterations_count'))
});
