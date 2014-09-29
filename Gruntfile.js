'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'app/libs',
          layout: 'byComponent',
          cleanTargetDir: true,
          cleanBowerDir: true
        }
      }
    },

    watch: {
      all: {
        files: ['app/js/**.js'],
        tasks: ['newer:jshint:all']
      },
      test: {
        files: ['test/unit/**.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['app/js/**.js'],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**.js']
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    clean: {
      dist: {
        src: [
          '.tmp', 'dist', 'dist.zip'
        ]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '**',
          dest: 'dist'
        }]
      }
    },

    useminPrepare: {
      html: 'app/html/**.html',
      options: {
        dest: 'dist/html'
      }
    },
    usemin: {
      html: 'dist/html/*.html'
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/js',
          src: '**.js',
          dest: '.tmp/js'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist/html',
          src: '**.html',
          dest: 'dist/html'
        }]
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '/**\n'
                + ' * @license <%= pkg.name %> v<%= pkg.version %>\n'
                + '<%= pkg.author && pkg.homepage ? " * (c) " + grunt.template.today("yyyy") + " " + pkg.author.name + " " + pkg.homepage + "\\n" : "" %>'
                + '<%= pkg.licenses ? " * License: " + _.pluck(pkg.licenses, "type").join(", ") + "\\n" : "" %>'
                + ' */'
        },
        files: {
          src: ['dist/css/**.css', 'dist/js/**.js']
        }
      }
    },

    shell: {
      archive: {
        command: 'zip -r dist.zip dist'
      }
    }

//    autoprefixer: {
//      options: {
//        browsers: ['last 1 version']
//      },
//      dist: {
//        files: [{
//          expand: true,
//          cwd: '.tmp/css',
//          src: '**.css',
//          dest: '.tmp/css'
//        }]
//      }
//    },

//    rev: {
//      dist: {
//        files: {
//          src: [
//            'dist/js/**.js',
//            'dist/css/**.css',
//            'dist/img/**.{png,jpg,jpeg,gif,webp,svg}'
//          ]
//        }
//      }
//    }
  });

  grunt.registerTask('init', [
    'bower:install'
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'copy',
    'concat',
//    'autoprefixer',
    'ngAnnotate',
    'cssmin',
    'uglify',
//    'rev',
    'usemin',
    'htmlmin',
    'usebanner',
    'shell:archive'
  ]);

  grunt.registerTask('default', [
    'init'
  ]);
};
