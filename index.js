/*
 * spm modules build 
 *
 * Copyright (c) 2014 Leo Du
 * Licensed under the MIT license.
 * https://github.com/duhaibin/spm-modules-build/blob/master/LICENSE-MIT
 */

var path = require("path");
var grunt = require("spm-grunt");
var config = require("./lib/config");

var _cache = {};

exports = module.exports = function (options) {

	options = parseOptions(options);

	var pkg = options.pkg;

    if (!pkg.spm) {
    	throw new Error('spm is required in package.json');
    }
  	if (!pkg.spm.output) {
    	throw new Error('spm.output is required in package.json');
  	}

  	grunt.invokeTask('module-build', options, function (grunt) {
  		
  		var config = config(options);

  		grunt.initConfig(config);

  		loadTasks();

  		grunt.task.options({'done': function() { 
        	grunt.log.writeln('success build finished.');
      }});

      grunt.registerInitTask('module-build', [
        'clean:build', // delete build direcotry first
        'spm-install', // install dependencies
        // build css
        'transport:src',  // src/* -> .build/src/*
        'concat:css',   // .build/src/*.css -> .build/tmp/*.css
        // build js (must be invoke after css build)
        'transport:css',  // .build/tmp/*.css -> .build/src/*.css.js
        'concat:js',  // .build/src/* -> .build/dist/*.js
        // to ./build/dist
        'copy:build',
        'cssmin:css',   // .build/tmp/*.css -> .build/dist/*.css
        'uglify:js',  // .build/tmp/*.js -> .build/dist/*.js
        'clean:dist',
        'copy:dist',  // .build/dist -> dist
        'clean:build',
        'spm-newline'
      ]);


  	});

};

exports.parseOptions = parseOptions;

function parseOptions (options) {
	options = options || _cache || {};

	var packageFile = options.packageFile || "package.json";
	
	var packageObj = {};

	if (grunt.file.exists(packageFile)) {
	    packageObj = grunt.file.readJSON(packageFile);
	}
	options.pkg = packageObj;

	return options;
}

function loadTasks(grunt) {
    
    var tasks = [
        'grunt-cmd-transport',
        'grunt-cmd-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-copy',
        'grunt-contrib-cssmin',
        'grunt-contrib-clean',
        'grunt-contrib-compress',
        'grunt-md5'
    ]

    tasks.forEach(function (task) {
      var taskdir = path.join(__dirname, 'node_modules', task, 'tasks');
      if (grunt.file.exists(taskdir)) {
        grunt.loadTasks(taskdir);
      }
    });

    grunt.loadTasks(path.join(__dirname, 'tasks'));
}

exports.loadTasks = loadTasks;
exports.getConfig = getConfig;

