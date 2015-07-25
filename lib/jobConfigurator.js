/**
 * Handle processing command line
 * and env parameters, etc into a job configuration
 */

var minimist = require('minimist');
var fs = require('fs');


function extractOptions(argv){
    var options = minimist(argv.slice(2));
    var env = options.e || options.env;
    return {
        'env': env
    };
}

function createConfiguration(argv,path){
    var props = JSON.parse(fs.readFileSync(path, 'utf8'));
    var opts = extractOptions(argv);
    var serverSettings;

    if((! opts.env) || (! props.envs[opts.env])){
        serverSettings = props.envs[0];
    } else {
        serverSettings = props.envs[opts.env];
    }

    return {
        'logBase': process.env.LOG_DIR || '~/Documents/logs',
        'server' : serverSettings,
        'args': opts
    };
}

module.exports = {
    'createConfiguration': createConfiguration,
    'extractOptions': extractOptions
}