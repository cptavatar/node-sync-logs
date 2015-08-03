var jobConfig = require('../lib/jobConfigurator');
var logConcat = require('../lib/logConcatenator');
var rsyncService = require('../lib/rsyncService');
var fileOps = require('../lib/fileOperations');
var expandHomeDir = require('expand-home-dir');


function syncLogFiles(arguments) {
    var config = jobConfig.createConfiguration(arguments, expandHomeDir('~/.logsync.json'));
    fileOps.ensureDir(config);
    fileOps.clean(config);
    rsyncService.syncLogs(config);
    logConcat.concatenateLogs(config);
}


module.exports = {
	'syncLogFiles': syncLogFiles

}
