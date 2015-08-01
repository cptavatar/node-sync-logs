/**
 * Module to handle processing command line
 * and env parameters, etc into a job configuration
 */

var minimist = require('minimist');
var fs = require('fs');
var expandHomeDir = require('expand-home-dir');

function extractOptions(argv) {
    var options = minimist(argv.slice(2));
    var env = options.e || options.env;
    var cleanAllFiles = options.c;

    return {
        'env': env,
        'cleanAllFiles': cleanAllFiles
    };
}

function createConfiguration(argv, path) {
    var props = JSON.parse(fs.readFileSync(path, 'utf8'));
    var opts = extractOptions(argv);
    var config, i;


    if (!opts.env) {
        //no env passed, default to first
        config = props.envs[0];
    }
    else {
        for (i in props.envs) {
            if (props.envs[i].env === opts.env) {
                config = props.envs[i];
                break;
            }
        }
    }

    if (!config) {
        throw new Error("Could not find environment.");
    }

    // TODO make logbase a property in JSON file?
    config.logBase = expandHomeDir( process.env.LOG_DIR || '~/Documents/logs');
    config.cleanAllFiles = opts.cleanAllFiles;
    config.destDir = config.logBase + "/" + config.env;
    config.logs = props.logs;
    return config;
}

module.exports = {
    'createConfiguration': createConfiguration,
    'extractOptions': extractOptions
}