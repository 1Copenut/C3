module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		express: {
			options: {
			  // Override defaults here
			},
			dev: {
			  options: {
			    script: 'server/server.js'
			  }
			}
		},
		
		jshint: {
			files: ["app/scripts/*.js", "!app/scripts/main.js"],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					define: true
				}
			}
		},
		
		compass: {
			dev: {
				options: {
					sassDir: "app/styles/sass",
					cssDir: "app/styles/css"
				}
			}
		},
		
		watch: {
	    options: {
	      livereload: true
	    },
	    css: {
	      files: ['app/styles/sass/*.scss'],
	      tasks: ['compass']
	    },
			html: {
				files: ['app/*.html']
			}
	  },
	
		open : {
			dev : {
			  path: 'http://127.0.0.1:3000/',
			  app: 'Google Chrome'
			}
		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask("server", ["express:dev", "open:dev", "watch"]);
};