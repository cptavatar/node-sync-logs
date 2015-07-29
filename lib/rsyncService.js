var Rsync = require('rsync');
var exec = require('child_process');


function createCommand(config) {
    var i, x, tempPath, splitPath, rsync = new Rsync()
        .flags('avz')
        .source(config.server)
        .destination(config.logBase + "/" + config.env);

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
    var child, cmd = createCommand(config);
    console.log(cmd);
    child = exec.execSync(cmd, {stdio: [0, 1, 2]});

}

module.exports = {
    'syncLogs': syncLogs,
    'createCommand': createCommand
}