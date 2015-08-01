var Rsync = require('rsync');
var exec = require('../lib/commandRunner');

/**
 * Module to handle rsync operations
 */


function createCommand(config) {
    var i, x, tempPath, splitPath, rsync = new Rsync()
        .flags('rtvu')
        .set('copy-dirlinks')
        .source(config.server)
        .destination(config.destDir);

    for (i in config.paths) {
        splitPath = config.paths[i].split('/');
        tempPath = '';
        for (x in splitPath) {
            if (tempPath) {
                tempPath = tempPath + '/' + splitPath[x];
            } else {
                tempPath = splitPath[x];
            }
            rsync.include(tempPath);
        }
    }
    rsync.exclude("*");
    return rsync.command();
}

function syncLogs(config) {
    exec.execSync(createCommand(config));
}

module.exports = {
    'syncLogs': syncLogs,
    'createCommand': createCommand
}