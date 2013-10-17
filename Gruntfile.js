/*!
 * Gruntfile for Sortable Web Parts
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

module.exports = function(grunt) {

	/**
	 * Load required Grunt tasks.
	 */
	grunt.loadNpmTasks('grunt-bookmarklet-thingy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/**
	 * Task configuration
	 */
	var taskConfig = {
		dirs: {
			build: 'bin',
			bookmarklet: '<%= dirs.build %>/bookmarklet',
			plugin: '<%= dirs.build %>/plugin',
			src: 'src'
		},

		files: {
			bookmarlet: 'sp-sortablewebparts.bookmarklet.js',
			main: 'sp-sortablewebparts.js',
			plugin: 'sp-sortablewebparts.min.js'
		},

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			bookmarklet: '<%= dirs.bookmarklet %>/*',
			plugin: '<%= dirs.plugin %>/*'
		},

		jshint: {
			src: [ 
				'<%= dirs.src %>/*.js'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				ignores: ['/**/*.min.js'],
				curly: true,
				immed: true,
				newcap: false,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true,
				multistr: true,
				scripturl: true,
				smarttabs: true,
				'-W099': true,
				loopfunc: true
			}
		},

		bookmarklet: {
			generate: {
				js: [
					'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
					'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js'
				],
				jsIds: [
					'jquery-min',
					'jquery-ui-min'
				],
				body: '<%= dirs.src %>/<%= files.main %>',
				out: '<%= dirs.bookmarklet %>/<%= files.bookmarlet %>',
				amdify: false,
				timestamp: false
			}
		},

		uglify: {
			plugin: {
				files: {
					'<%= dirs.plugin %>/<%= files.plugin %>': ['<%= dirs.src %>/<%= files.main %>']
				}
			}
		},

		copy: {
			plugin: {
				files: [
					{
						src: ['**', '.**/*'],
						dest: '<%= dirs.plugin %>/vendor',
						cwd: '<%= dirs.src %>/vendor',
						expand: true
					}
				]
			}
		}
	};

	grunt.initConfig(taskConfig);


	/**
	 * Register tasks
	 */
	grunt.registerTask('plugin', [
		'clean:plugin', 'jshint', 'uglify:plugin', 'copy:plugin'
	]);

	grunt.registerTask('bookmark', [
		'clean:bookmarklet', 'jshint', 'bookmarklet'
	]);

	grunt.registerTask('build', [
		'plugin', 'bookmark'
	]);
};