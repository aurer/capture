module.exports = function(grunt){
	grunt.initConfig({
		// Main options
		srcDir: 'assets',
		distDir: 'public',
		serve: '192.168.99.100:3000',

		// Load packages
		pkg: grunt.file.readJSON('package.json'),

		// Define tasks
		clean: {
			css: ['<%= distDir %>/css/*'],
			js: ['<%= distDir %>/js/*'],
			images: ['<%= distDir %>/images/*']
		},

		less: {
			dist: {
				options: {
					compress: true,
					sourceMap: true,
					plugins: [
	        	new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions', 'ie 8', 'ie 9']}),
	        ]
				},
				files: [{
					expand: true,
					cwd: "<%= srcDir %>/less/",
					src: "*.less",
					dest: "<%= distDir %>/css/",
					ext: '.css'
				}]
			}
		},

		browserify: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= srcDir %>/js/",
					src: ["*.js"],
					dest: "<%= distDir %>/js/",
					ext: '.js'
				}]
			}
		},

		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= distDir %>/js/",
					src: ["*.js"],
					dest: "<%= distDir %>/js/",
					ext: '.js'
				}]
			}
		},

		copy: {
			images: {
				files: [{
					expand: true,
					cwd: "<%= srcDir %>/images/",
					src: ["*"],
					dest: "<%= distDir %>/images/"
				}]
			}
		},

		filerev: {
			css: {
				src: '<%= distDir %>/css/*.css'
			},
			js: {
				src: '<%= distDir %>/js/*'
			}
		},

		watch: {
			less: {
				files: '<%= srcDir %>/less/**/*.less',
				tasks: ['less']
			},
			js: {
				files: '<%= srcDir %>/js/*.js',
				tasks: ['js']
			},
			images: {
				files: '<%= srcDir %>/images/*',
				tasks: ['copy:images']
			}
		},

		browserSync: {
			bsFiles: {
				src : [
					'<%= distDir %>/css/*.css',
					'<%= distDir %>/js/*.js',
					'site/**/*.php',
					'content/**/*'
				]
			},
			options: {
				proxy: '<%= serve %>',
				watchTask: true,
				notify: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Create a manifest file from filerev summary
	grunt.registerTask('rev-manifest', 'Create a filerev manifest', function(){
		grunt.file.write('assets/dist/rev-manifest.json', JSON.stringify(grunt.filerev.summary));
	});

	grunt.registerTask('js', ['browserify', 'uglify']);
	grunt.registerTask('css', ['less']);
	grunt.registerTask('images', ['clean:images', 'copy:images']);

	grunt.registerTask('default', ['clean', 'css', 'js', 'images']);
	grunt.registerTask('dev', ['default', 'browserSync', 'watch']);
	grunt.registerTask('build', ['clean', 'default', 'filerev', 'rev-manifest']);
};
