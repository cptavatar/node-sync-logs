#!/usr/bin/env node

/*
  Script to pull down log files and rsync them to

 */
var master = require('node-sync-logs');

master.syncLogFiles(argv.e);
