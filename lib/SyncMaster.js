var jobConfig = require('../lib/jobConfigurator');


var expandHomeDir = require('expand-home-dir');


function syncLogFiles(arguments) {
    var config = jobConfig.createConfiguration(arguments, expandHomeDir('~/.synclogs.json'));
    var log = require('../lib/logger')(config);
    var exec = require('../lib/commandRunner')(log);
    var fileOps = require('../lib/fileOperations')(exec, log);
    var rsyncService = require('../lib/rsyncService')(exec, log);
    var logConcat = require('../lib/logConcatenator')(log, fileOps);

    fileOps.ensureDir(config);
    fileOps.clean(config);
    rsyncService.syncLogs(config);
    logConcat.concatenateLogs(config);
}


module.exports = {
	'syncLogFiles': syncLogFiles

}
