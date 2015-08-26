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
                            //this assumes filename.ext ...
                            var splitFile = fileName.split(".");
                            fileOps.append(config.destDir + "/" + splitFile[0]
                                + "." + maxVersion + "." + splitFile[1],
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
                var newVersion;
                var i;

                if (record) {
                    version = _.first(
                        _.filter(pathElements, function (elem) {
                            return elem.indexOf(record.prefix) == 0;
                        }));

                    version = version.split('-');

                    i = version.length - 1;
                    while (version[i] === '1' || version[i] === 'v' || version[i] === 's') {
                        i--;
                    }

                    newVersion = version[i];

                    //look for versions that start with cXXXX, convert
                    //so the sort properly
                    if (newVersion[0] === 'c') {
                        newVersion = newVersion.substring(1);
                    }


                    if (!record.versions[newVersion]) {
                        record.versions[newVersion] = {files: []};
                    }

                    record.versions[newVersion].files.push(file);
                }

            });

        }

    }
}