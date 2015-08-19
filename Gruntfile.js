module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		},
		copy: {
			prepare: {
				files: [{
					src: [
						'**',
						'!node_modules/**',
						'!bower_components/**',
						'!Contributing.md',
						'!Gruntfile.js',
						'!License.md',
						'!Readme.md',
						'!bower.json',
						'!package.json'
					],
					dest: 'temp/pres/'
				}, {
					expand: true,
					cwd: 'bower_components/tauCharts/',
					src: [
						'build/tauCharts.min.js',
						'src/tau.plugins.js',
						'src/class.js',
						'plugins/tooltip.js',
						'plugins/highlighter.js',
						'css/**'
					],
					dest: 'temp/pres/tauCharts/'
				}, {
					expand: true,
					cwd: 'bower_components/codemirror/',
					src: [
						'lib/codemirror.css',
						'lib/codemirror.js',
						'mode/javascript/javascript.js'
					],
					dest: 'temp/pres/codemirror/'
				}, {
					expand: true,
					cwd: 'node_modules/shower-core/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/'
				}, {
					expand: true,
					cwd: 'bower_components/d3/',
					src: [
						'd3.min.js',
					],
					dest: 'temp/pres/d3/'
				}, {
					expand: true,
					cwd: 'bower_components/highcharts/',
					src: [
						'highcharts.js',
					],
					dest: 'temp/pres/highcharts/'
				}, {
					expand: true,
					cwd: 'bower_components/underscore/',
					src: [
						'underscore.js',
					],
					dest: 'temp/pres/underscore/'
				}, {
					expand: true,
					cwd: 'bower_components/jquery/',
					src: [
						'dist/jquery.min.js',
						'dist/jquery.min.map'
					],
					dest: 'temp/pres/jquery/'
				}, {
					expand: true,
					cwd: 'node_modules/shower-ribbon/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/themes/ribbon/'
				}, {
					expand: true,
					cwd: 'node_modules/shower-bright/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/themes/bright/'
				}]
			}
		},
		replace: {
			core: {
				src: 'temp/pres/index.html',
				overwrite: true,
				replacements: [{
					from: /(node_modules|bower_components)\/shower-core/g,
					to: 'shower'
				}, {
					from: /(node_modules|bower_components)\/shower-(ribbon|bright)/g,
					to: 'shower/themes/$2'
				}, {
					from: /(bower_components)\/jquery/g,
					to: 'jquery'
				}, {
					from: /(bower_components)\/underscore/g,
					to: 'underscore'
				}, {
					from: /(bower_components)\/codemirror/g,
					to: 'codemirror'
				}, {
					from: /(bower_components)\/tauCharts/g,
					to: 'tauCharts'
				}, {
					from: /(bower_components)\/d3/g,
					to: 'd3'
				}, {
					from: /(bower_components)\/highcharts/g,
					to: 'highcharts'
				}]
			},
			themes: {
				src: 'temp/pres/shower/themes/*/index.html',
				overwrite: true,
				replacements: [{
					from: '../shower-core', to: '../..'
				}]
			}
		},
		'gh-pages': {
			options: {
				base: 'temp/pres',
				clone: 'temp/clone'
			},
			src: ['**']
		},
		compress: {
			shower: {
				options: {
					archive: 'archive.zip'
				},
				files: [{
					expand: true,
					cwd: 'temp/pres/',
					src: '**',
					dest: '.'
				}]
			}
		},
		clean: ['temp']
	});

	grunt.registerTask('publish', [
		'copy',
		'replace',
		'gh-pages',
		'clean'
	]);

	grunt.registerTask('archive', [
		'copy',
		'replace',
		'compress',
		'clean'
	]);

};
