var Service = require('node-linux').Service;

var svc = new Service({
    name        :'NSC Client',
    description : 'NSC Server Client API.',
    script      : __dirname + '/server.js'
});

svc.on('install',function(){
    svc.start();
});

svc.install();