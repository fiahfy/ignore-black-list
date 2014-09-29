'use strict';

module.exports = function(config){
  
  config.set({

    basePath: '../',

    files: [
      'app/libs/angular/angular.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/js/app.js',
      'app/js/controllers.js',
      'app/js/directives.js',
      'app/js/filters.js',
      'app/js/services.js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
