var findit = require('findit');
var _ = require('underscore');
var fileOps = require('../lib/fileOperations');

function concatenateLogs(config) {
    var finder = findit(config.destDir);
    var fileMap = {};
    var pathElements, filename, directoryName;

    config.logs.forEach(function(log) {
        fileMap[log[1]] = {prefix: log[0],
                            versions: {}};
    })

    finder.on('end', function (file, stat) {
        _.keys(fileMap).forEach(function(fileName){
            var record = fileMap[fileName];
            var maxVersion = _.last(_.keys(record.versions).sort());
            /*console.log("filename: " + fileName  + " max:" + maxVersion);
                _.keys(record.versions).forEach(function(k) {
                    console.log("--->" +k);
            });*/
            record.versions[maxVersion].files.forEach(function(x){
                fileOps.append(config.destDir + "/" + maxVersion + "." + fileName,
                x);
            });

        })
    });

    finder.on('file', function (file, stat) {
        var pathElements = file.split("/");
        var filename = _.last(pathElements);
        var record = fileMap[filename];
        var version;

        if(record){
            version = _.first(
                _.filter(pathElements, function(elem){
               return  elem.indexOf(record.prefix) == 0 ;
            }));

            if(! record.versions[version]){
                record.versions[version] = {files:[]};
            }

            record.versions[version].files.push(file);
        }

    });

}

module.exports = {
    'concatenateLogs': concatenateLogs
}