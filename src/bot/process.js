'use strict'

let _ = require('lodash');

let Settings = require('./app/classes/Settings.js');
let boot = require('./boot.js')('process');

let app = require('./app/app.js');


let iterations = 0;
let interval_id = false;

let doFn = function (ws, interval, count) {
	interval_id = setInterval(() => {
		iterations++;

		ws.getNext().then((ticket) => ticket.arrived()).then((d) => d.close()).then((d) => console.log(d.code));

		if (iterations == count) {
			clearInterval(interval_id);
			// process.exit();
		}
	}, interval);
}

app.then((ws) => {
	// doFn(ws, Settings.getItem('interval'), Settings.getItem('iterations_count'))
	let ticket_arrived = new Promise((res) => {
		ws.once('queue.update', (d) => res(_.first(d.live.tickets)))
	});
	return ticket_arrived
}).then((d) => {
	console.log('Ticket', d.code);
});
