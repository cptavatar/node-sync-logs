var colors = require('colors');

function log(msg, level) {
    var now = new Date();
    //maybe I'll do a nice date later...
    console.log('[ ' + now.getTime() + ' ] ' + level + ' ' + msg);
}

module.exports = function create(config) {

    return {
        debug: function (msg) {
            if (config.isDebug) {
                log(msg, 'DEBUG');
            }
        },
        error: function (msg) {
            log(colors.red(msg), 'ERROR');
        },
        info: function (msg) {
            log(colors.green(msg), 'INFO');
        }
    }
}