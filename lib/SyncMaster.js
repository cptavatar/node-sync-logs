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
//    logConcat.concatLogs(config);
}

//function createServerName (jobDetail){
//	if(jobDetail.env === 'prod'){
//        return 'logview.tuk.cobaltgroup.com';
//    }
//    return 'logview.' + env +'.cobaltgroup.com';
//}
//function createLogInclues(jobDetails){
//    if(jobDetail.env === 'prod'){
//        return ["social/tukpdmgsmm*/social*/*", "services/tukpdmgopen*/social*1.0.0*/*.log*"];
//    }
//
//}

module.exports = {
	'syncLogFiles': syncLogFiles

}
