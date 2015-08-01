var exec = require('child_process');

/**
 * Module for executing commands
 * consolidate how we run commands in case we would
 * like to change how its done (especially since it
 * requires 12.x right now)
 */



/**
 * Execute a command string synchronously
 *
 * @param cmd
 */
function execSync(cmd){
    var child;
    console.log(cmd);
    child = exec.execSync(cmd, {stdio: [0, 1, 2]});
}

module.exports = {
   execSync: execSync
}