// Sample project configuration.
// Bundle size - 18/02/20: 314,4KB
module.exports = function (grunt) {

	var toRootDir = '..';

	grunt.initConfig({
		concat: {
			dist: {
				src: [
					'js/src/vendor/jquery-3.5.1.min.js',
					'js/src/app/**/*.js',
				],
				dest: 'js/app.min.js'
			},
		},
		uglify: {
			my_target: {
				options: {
					sourceMap: false,
					sourceMapName: 'sourceMap.map'
				},
				// We'll be using a common JS for all the sites
				files: {
					'js/app.min.js': [
						'js/app.min.js'
					]
				}
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'css/scss',
					cssDir: 'css',
					outputStyle: 'compressed'
				}
			}
		},
		majestic_updateversions: {
			css: {},
			js: {}
		},
		watch: {
			watch_js_files: {
				files: ['js/src/**/*.js'],
				tasks: ['concat', 'majestic_updateversions:js']
			},
			watch_css_files: {
				files: ['css/scss/**/*.scss'],
				tasks: ['compass', 'majestic_updateversions:css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-majestic-updateversions');

	// Default, to be used on development environments
	grunt.registerTask('default', ['compass', 'concat', 'majestic_updateversions:js', 'majestic_updateversions:css', 'watch']); // First we compile and concat JS and then we watch

	// Post Commit, to be executed after commit
	grunt.registerTask('deploy', ['concat', 'uglify', 'compass', 'majestic_updateversions:js', 'majestic_updateversions:css']);

};