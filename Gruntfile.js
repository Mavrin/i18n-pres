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
					cwd: 'node_modules/highlightjs/',
					src: [
						'styles/tomorrow.css',
						'highlight.pack.min.js',
					],
					dest: 'temp/pres/highlightjs/'
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
					cwd: 'node_modules/shower-ribbon/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/themes/ribbon/'
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
					from: /(node_modules)\/highlightjs/g,
					to: 'highlightjs'
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
