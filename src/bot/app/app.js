'use strict'

function Login(login, password, workstation_type) {
	let User = require('./classes/User.js');
	let bot = new User(workstation_type);

	return bot.login(login, password).then(() => {
		return bot.getWorkstation(workstation_type);
	})
};

let Settings = require('./classes/Settings.js');

module.exports = Login(Settings.getItem('login'), Settings.getItem('password'), Settings.getItem('workstation_type'))
