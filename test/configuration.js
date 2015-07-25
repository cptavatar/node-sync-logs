var assert = require('chai').assert;
var jobConfig = require('../lib/jobConfigurator');

describe('jobConfigurator', function() {
    describe('#extractOptions()', function() {
        it('should extract out -e', function() {
            assert.equal('prod', jobConfig.extractOptions(['node','syncLogs','-e','prod']).env );
            assert.equal('prod', jobConfig.extractOptions(['node','syncLogs','--env=prod']).env );
        });
        it('should handle no flags', function() {
            assert.isUndefined(jobConfig.extractOptions(['node','syncLogs']).env );
        });
    });
});