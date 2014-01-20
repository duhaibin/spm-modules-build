/*
 * spm modules build 
 *
 * Copyright (c) 2014 Leo Du
 * Licensed under the MIT license.
 * https://github.com/duhaibin/spm-modules-build/blob/master/LICENSE-MIT
 */

var grunt = require('spm-grunt');

function _require (name) {
	return require('./configs/' + name);
}

var concat = _require('concat');
var clean = _require('clean');
var transport = _require('transport');
var uglify = _require('uglify');
var md5 = _require('md5');

exports = module.exports = function (options) {
	
	// if (!grunt.file.isFile(dirname, 'package.json')) {
 //        throw new Error('can not find package.json in `' + dirname + '`!');
 //    }

 //    var pkg = grunt.file.readJSON(dirname + '/package.json');
 //    var buildConfig = pkg.spm;
 //    buildConfig.src = dirname.replace(/[\\\/\.]/g, '');
 //    buildConfig.family = pkg.family || buildConfig.src;
 //    buildConfig.outputDir = (options.outputDirectory || 'sea-modules').replace(/\\/g, '/').replace(/\/$/g, '');
 //    buildConfig.dist = buildConfig.outputDir + '/' + buildConfig.family;
 //    buildConfig.gzip = options.gzip;

};