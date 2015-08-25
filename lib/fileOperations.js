var commonExtensions = ['log','html','out'];

/**
 * Module to handle file operation commands
 */



module.exports = function create(exec, log) {

    return {
        'clean': function clean(config) {


            var i;
            if (config.cleanAllFiles) {
                log.info('Clean all files from ' + config.destDir);
                exec.execSync("rm -rf " + config.destDir + "/*");
            } else {
                log.info('Clean old concatenated files from ' + config.destDir +
                    ', leaving rsynced logs');
                //clean out common extensions we might have concatenated
                //could I regex this? Maybe, this was easier to figure out
                for (i in commonExtensions) {
                    exec.execSync("rm -f " + config.destDir + "/*." + commonExtensions[i]);
                }
            }
        },

        'ensureDir': function ensureDir(config) {
            exec.execSync("mkdir -p " + config.destDir);
        },

        'append': function append(dest, source) {
            //stupid 10.x && no execSync...
            exec.execSync("sh -c 'cat " + source + " >> " + dest + "'");

        }
    }
}