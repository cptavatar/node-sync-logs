/**
 * Handle processing command line
 * and env parameters, etc into a job configuration
 */

var minimist = require('minimist');
var fs = require('fs');


function extractOptions(argv) {
    var options = minimist(argv.slice(2));
    var env = options.e || options.env;

    return {
        'env': env
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
    config.logBase = process.env.LOG_DIR || '~/Documents/logs'
    return config;
}

module.exports = {
    'createConfiguration': createConfiguration,
    'extractOptions': extractOptions
}