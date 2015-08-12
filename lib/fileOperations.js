var exec = require('../lib/commandRunner');
var commonExtensions = ['log','html','out'];

/**
 * Module to handle file operation commands
 */

function clean(config) {
    var i
    if (config.cleanAllFiles) {
        exec.execSync("rm -rf " + config.destDir + "/*");
    } else {
        //clean out common extensions we might have concatenated
        //could I regex this? Maybe, this was easier to figure out
        for(i in commonExtensions) {
            exec.execSync("rm -f " + config.destDir + "/*." + commonExtensions[i]);
        }
    }
}

function ensureDir(config) {
    exec.execSync("mkdir -p " + config.destDir);
}

function append(dest, source) {
    //stupid 10.x && no execSync...
    exec.execSync("sh -c 'cat " + source + " >> " + dest + "'");
}

module.exports = {
    clean: clean,
    ensureDir: ensureDir,
    append:append
}