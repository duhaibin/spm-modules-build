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

function loadTasks () {
	
}

