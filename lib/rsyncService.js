var Rsync = require('rsync');

/**
 * Module to handle rsync operations
 */





module.exports = function (exec, log) {
    return {
        'createCommand': function createCommand(config) {
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
        },

        'syncLogs': function syncLogs(config) {
            log.info("Running rsync...");
            exec.execSync(this.createCommand(config));
        }
    }
}