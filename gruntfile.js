'use strict';
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        protractor: {
            cucumber: {
                options : {
                    configFile: 'tests/config/protractor.conf.js',
                    keepAlive: true
                }
            }
        },
        selenium_standalone: {
            options: {
                stopOnExit: true
            },
            e2e: {
                seleniumVersion: '2.53.1',
                seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
                drivers: {
                    chrome: {
                        version: '2.21',
                        baseURL: 'http://chromedriver.storage.googleapis.com'
                    },
                    ie: {
                        version: '2.53.1',
                        arch: 'ia32',
                        baseURL: 'http://selenium-release.storage.googleapis.com'
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-selenium-standalone');



    grunt.registerTask(
        // 'e2e', ['selenium_standalone:e2e:install', 'selenium_standalone:e2e:start', 'protractor']
        'e2e', ['protractor']

    );
};

