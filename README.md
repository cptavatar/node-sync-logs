# node-sync-logs
It would be nice until have your logs in kibana or some other searchable system but sometimes that isn't set up (hopefully eventually).

The need to go through logs doesn't go away, and if you have multiple nodes (and versions) its a pain to navigate individual node log directories sometimes. This project is just an attempt at modernization of a shell script I got tired of maintaining as environments and locations kept changing. 
 
 The project will allow you define environment and log information, then use that information to rsync files down and concatate the log files from the latest versions. It's based on several assumptions (log mounts servers, packages with version numbers, etc)  but who knows, it might be useful for someone...  