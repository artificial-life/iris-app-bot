'use strict'

let _ = require('lodash');

let Settings = require('./app/classes/Settings.js');
let boot = require('./boot.js')('process');

let app = require('./app/app.js');

if (process.argv[2] && process.argv[3]) {
	Settings.setItem('login', process.argv[2]);
	Settings.setItem('password', process.argv[3]);
}

if (process.argv[4]) {
	Settings.setItem('control-panel_arm_id', process.argv[4]);
}

let iterations = 0;
let interval_id = false;
let current_ticket = false;

let doFn = function (ws, interval, count) {
	interval_id = setInterval(() => {
		iterations++;
		current_ticket && current_ticket.arrived().then(() => ws.getNext()).then(d => current_ticket = d);
		if (iterations == count) clearInterval(interval_id);
	}, interval);
}
app.then((ws) => {
	return new Promise((resolve) => {
		ws.once('queue.update', (d) => resolve({
			ticket: _.first(d.live.tickets),
			ws: ws
		}));
	});
}).then((d) => {
	current_ticket = d.ticket;
	console.log('Ticket', d.ticket.code);
	doFn(d.ws, Settings.getItem('interval'), Settings.getItem('iterations_count'));
});
