var assert = require('chai').assert;
var jobConfig = require('../lib/jobConfigurator');

describe('jobConfigurator', function () {
    describe('#extractOptions()', function () {
        it('should extract out -e', function () {
            assert.equal('prod', jobConfig.extractOptions(['node', 'syncLogs', '-e', 'prod']).env);
            assert.equal('prod', jobConfig.extractOptions(['node', 'syncLogs', '--env=prod']).env);
        });
        it('should handle no flags', function () {
            assert.isUndefined(jobConfig.extractOptions(['node', 'syncLogs']).env);
        });
    });
    describe('#createConfiguration()', function () {
        it('should create the right configuration when a flag is passed', function () {
            var config = jobConfig.createConfiguration(['node', 'syncLogs', '-e', 'pre-prod'], 'test/test-definition.json');
            assert.equal('my.preprod.server', config.server);
            assert.equal('pre-prod', config.env);

        });
        it('should create the right configuration by default', function () {
            var config = jobConfig.createConfiguration(['node', 'syncLogs'], 'test/test-definition.json');
            assert.equal('my.prod.server', config.server);
            assert.equal('prod', config.env);
        });
    });
});