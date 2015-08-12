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
function execSync(cmd){
    console.log(cmd);
    return exec(cmd);
}

module.exports = {
   execSync: execSync
}