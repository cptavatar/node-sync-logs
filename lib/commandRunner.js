var exec = require('sync-exec');

/**
 * Module for executing commands
 * consolidate how we run commands
 * (I have some projects that aren't 12.x friendly right now)
 */



/**
 * Execute a command string synchronously
 *
 * @param cmd
 */


module.exports = function create(log) {
    return {
        execSync: function execSync(cmd) {
            log.debug(cmd);
            return exec(cmd);
        }
    }
}