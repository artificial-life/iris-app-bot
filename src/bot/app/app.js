'use strict'


let settings = require('./classes/Settings.js');
let workstation_type = 'terminal';

let User = require('./classes/User.js');
let bot = new User(workstation_type);

let login = settings.getItem('login');
let password = settings.getItem('password');

bot.login(login, password).then(() => {
  console.log('connection complete');

  let ws = bot.getWorkstation(workstation_type);
  let fields = ws.fields;
  setTimeout(function() {
    ws.confirm({
      service: 'service-1',
      service_count: 1
    }, true).then((d) => {
      console.log(d);
    })
  }, 2000);

})