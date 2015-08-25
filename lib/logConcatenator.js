var findit = require('findit');
var _ = require('underscore');


module.exports = function create(log, fileOps) {
    return {
        'concatenateLogs': function concatenateLogs(config) {
            var finder = findit(config.destDir);
            var fileMap = {};
            var pathElements, filename, directoryName;

            log.info('Concatenating files...');

            config.logs.forEach(function (log) {
                fileMap[log[1]] = {
                    prefix: log[0],
                    versions: {}
                };
            })

            finder.on('end', function (file, stat) {
                _.keys(fileMap).forEach(function (fileName) {
                    var record = fileMap[fileName];
                    var maxVersion = _.last(_.keys(record.versions).sort());

                    log.debug("filename: " + fileName + " max:" + maxVersion);
                    _.keys(record.versions).forEach(function (k) {
                        log.debug("--->" + k);
                    });

                    if (maxVersion) {
                        record.versions[maxVersion].files.forEach(function (x) {
                            fileOps.append(config.destDir + "/" + maxVersion + "." + fileName,
                                x);
                        });
                    }

                })
            });

            finder.on('file', function (file, stat) {
                var pathElements = file.split("/");
                var filename = _.last(pathElements);
                var record = fileMap[filename];
                var version;

                if (record) {
                    version = _.first(
                        _.filter(pathElements, function (elem) {
                            return elem.indexOf(record.prefix) == 0;
                        }));

                    if (!record.versions[version]) {
                        record.versions[version] = {files: []};
                    }

                    record.versions[version].files.push(file);
                }

            });

        }

    }
}