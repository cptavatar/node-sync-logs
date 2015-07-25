var jobConfig = require('jobConfigurator');
var logConcat = require('logConcatentator');
var rsyncService = require('rsyncService');



function syncLogFiles(arguments) {
     var config = jobConfig.createConfiguration(arguments, '~/.synclogs.properties');
    rsyncService.syncLogs(config);
    logConcat.concatLogs(config);
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
