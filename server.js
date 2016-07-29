var express = require('express');
var os      = require('os-utils');
var exec    = require('child_process').exec;

var app     = express();
var port    = process.env.PORT || 9090;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var default_request_error = function(req, res) { // default message if request cannot be executed
    res.json({
        'status'    : 'error',
        'request'   : req.route.path
    })
}

router.get('/', function(req, res) {
    res.json({ message: 'Server Client' });
});

// CPU related calls
router.get('/cpu/usage', function(req, res) {
    try {
        os.cpuUsage(function (v) {
            res.json({
                'status'    : 'success',
                'unit'      : 'percent',
                'value'     : v.toFixed(2),
                'decimal'   : v
            });
        });
    }
    catch(err) {
        default_request_error(req, res);
    }
});

router.get('/cpu/free', function(req, res) {
    try {
        os.cpuFree(function (v) {
            res.json({
                'status'    : 'success',
                'unit'      : 'percent',
                'value'     : v.toFixed(2),
                'decimal'   : v
            });
        });
    }
    catch(err) {
        default_request_error(req, res);
    }
});

// Memory related calls
router.get('/ram/free', function(req, res) {
    try {
        res.json({
            'status'    : 'success',
            'unit'      : 'megabyte',
            'value'     : os.freemem().toFixed(2),
            'notes'     : 'Excludes swap'
        });
    }
    catch(err) {
        default_request_error(req, res);
    }
});

router.get('/ram/free/percent', function(req, res) {
    try {
        res.json({
            'status'    : 'success',
            'unit'      : 'percent',
            'value'     : os.freememPercentage().toFixed(2),
            'notes'     : 'Excludes swap'
        });
    }
    catch(err) {
        default_request_error(req, res);
    }
});

router.get('/ram/total', function(req, res) {
    try {
        res.json({
            'status'    : 'success',
            'unit'      : 'megabyte',
            'value'     : os.totalmem().toFixed(2)
        });
    }
    catch(err) {
        default_request_error(req, res);
    }
});

// Disk related calls
router.get('/disk/:partition', function(req, res) {

    var partition = req.params.partition;
    
    try {
        os.harddrive(partition, function(total, free, used, err) {
            if(!err) {
                res.json({
                    'status'    : 'success',
                    'partition' : partition,
                    'unit'      : 'megabyte',
                    'total'     : total,
                    'free'      : free,
                    'used'      : used
                });
            } else {
                default_request_error(req, res);
            }
        });

    }
    catch(err) {
        default_request_error(req, res);
    }
});

// System related calls
router.get('/system/platform', function(req, res) {
    try {
        res.json({
            'status'    : 'success',
            'value'     : os.platform()
        })
    }
    catch(err) {
        default_request_error(req, res);
    }
});

router.get('/system/uptime', function(req, res) {
    try {
        res.json({
            'status'    : 'success',
            'unit'      : 'hours',
            'value'     : Math.floor(os.sysUptime() / (60 * 60))
        })
    }
    catch(err) {
        default_request_error(req, res);
    }
});

router.get('/system/load/:period', function(req, res) {

    var period = parseInt(req.params.period);

    if(period===1 || period===5 || period===15) {

        try {
            res.json({
                'status': 'success',
                'period': period,
                'unit': 'minutes',
                'value': os.loadavg(period)
            })
        }
        catch (err) {
            default_request_error(req, res);
        }

    } else {
        default_request_error(req, res);

        return false;
    }

});

// Service related calls
router.get('/service/:service', function(req, res) {

    var service = req.params.service;
    
    if(service) {
        try {
            exec("service " + service + " status", function (error, stdout, stderr) {

                if (stderr) {
                    res.json({
                        'status': 'error',
                        'service': service,
                        'error': stderr.replace(/\n$/, '')
                    });

                    return false;
                }

                res.json({
                    'status': 'success',
                    'service': service,
                    'response': stdout.replace(/\n$/, '')
                });
            });
        }
        catch(err) {
            default_request_error(req, res);
        }
    }


});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);