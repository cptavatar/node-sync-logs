#!/usr/bin/env node

/*
  Script to pull down log files and rsync them to

 */
var master = require('../lib/master');

master.syncLogFiles(process.argv);
