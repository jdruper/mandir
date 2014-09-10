module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dev: {
				options: {
					beautify: true
				},
				files: {					
					"public/js/app.js": [ 'js-src/**/*.js' ]
				}
			},
			dist: {
				files: {
					"public/js/app.min.js": [ 'js-src/**/*.js' ]
				}
			},
			vendor: {
				files: {
					"public/js/vendor.js": [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/ng-file-upload/angular-file-upload-shim.min.js',
						'bower_components/angular/angular.js',
                        'bower_components/angular-resource/angular-resource.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/ng-file-upload/angular-file-upload.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.js',
						'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
						'bower_components/angular-bootstrap/ui-bootstrap.js',
						'bower_components/autogrowtextarea/jquery.autogrowtextarea.min.js',						
						'bower_components/jquery/jquery.validate.min.js',
						'bower_components/prettyPhoto/js/jquery.prettyPhoto.js',											
						// 'bower_components/textAngular/dist/textAngular-sanitize.min.js',
						// 'bower_components/textAngular/dist/textAngular.min.js'											
						// 'bower_components/angular-animate/angular-animate.min.js',
						// 'bower_components/message-center-master/message-center.js'
					]
				}
			}
		},
		less: {
			options: {
				yuicompress: true	
			},
			vendor: {
				files: {
					"public/css/vendor.css": [
						'bower_components/bootstrap/less/bootstrap.less', 
						'bower_components/vendroid/font-awesome.min.css.less',
						'bower_components/vendroid/font-entypo.css.less',
						'bower_components/vendroid/fonts.css.less',
						'bower_components/vendroid/theme.min.less',
						'bower_components/vendroid/chrome.css.less',						
						'bower_components/vendroid/theme-responsive.min.less',												
						'bower_components/prettyPhoto/css/prettyPhoto.css',
						'bower_components/angular-message-center/dist/message-center.css'
					]

				}
			},
			deploy: {
				files: {
					"public/css/styles.css": ['less-src/**/*.less']

				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['uglify','less']);
	grunt.registerTask('vendor', ['uglify:vendor','less:vendor']);
}
