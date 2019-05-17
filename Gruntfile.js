var fs = require('fs')

// Liquid options for building tests...
var $liquifyOptions = {
  data: {
    version: '<%= pkg.version %>',
    style: fs.readFileSync('tests/src/base.css', 'UTF8')
  }
}

var $liquifyOptionsBasic = JSON.parse(JSON.stringify($liquifyOptions))
$liquifyOptionsBasic.data.title = 'Basic Test'
$liquifyOptionsBasic.data.message = 'Uses the minified distribution.'
$liquifyOptionsBasic.data.script = '../../dist/klache.min.js'

var $liquifyOptionsWebpack = JSON.parse(JSON.stringify($liquifyOptions))
$liquifyOptionsWebpack.data.script = 'bundle.js'
$liquifyOptionsWebpack.data.title = 'Bundle Test'
$liquifyOptionsWebpack.data.message = 'This test uses a Webpack bundle.'
    
module.exports = function(grunt) {
  
  // Banner for distributed assets
  var $banner = '/*! <%= pkg.name %> v<%= pkg.version %>, <%= pkg.homepage %> */'
  var $srcFile = 'index.js'
  //var $srcFile = 'src/lib.js';
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    /* ! Concat */

    concat: {
      options: { banner: $banner+'\n' },
      main: {
        src: $srcFile,
        dest: 'dist/klache.js',
      },
      // preserve backwards compatible locations in root..
      copy: {
        src: $srcFile,
        dest: 'klache.js',
      },
      // add banner to webpack
      webpack: {
        src: $srcFile,
        dest: $srcFile,
      }
    },
      
    /* ! Uglify */
    
    uglify: {
      options: {
        banner: $banner,
        beautify: false,
        mangle: false
      },
      // create distribution files for browser...
      dist: {
        files: {
          // minify source...
          'dist/klache.min.js': [$srcFile],
          // backwards compatible location
          'klache.min.js': [$srcFile],
        }
      }
    },
    
    /* ! Liquify */
    
    liquify: {
      // Basic test...
      basic: {
        options: $liquifyOptionsBasic,
        src: "tests/src/index.html",
        dest: "tests/basic/index.html"
      },
      // Webpack bundle test...
      webpack: {
        options: $liquifyOptionsWebpack,
        src: "tests/src/index.html",
        dest: "tests/webpack/index.html"
      }
    }
    
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-liquify');
  grunt.registerTask('default', function() {
    grunt.task.run([
      'uglify',
      'concat',
      'liquify'
    ]);
  });
   
};