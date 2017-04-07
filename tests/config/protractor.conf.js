// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

//const { SpecReporter } = require('jasmine-spec-reporter');

// exports.config = {
//   allScriptsTimeout: 11000,
//   specs: [
//     './e2e/**/*.e2e-spec.ts'
//   ],
//   capabilities: {
//     'browserName': 'chrome'
//   },
//   directConnect: true,
//   baseUrl: 'http://localhost:4200/',
//   framework: 'jasmine',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000,
//     print: function() {}
//   },
//   beforeLaunch: function() {
//     require('ts-node').register({
//       project: 'e2e/tsconfig.e2e.json'
//     });
//   },
//   onPrepare() {
//     jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
//   }
// };

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  // getPageTimeout: 60000,
  allScriptsTimeout: 50000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to this directory.
  specs: [
    '../*/*.feature'
  ],

  baseURL: 'http://localhost:4200/',

  cucumberOpts: {
    require: ['../step_definitions/stepDefinitions.js', 'env.js'],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  }
};
