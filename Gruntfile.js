module.exports = function(grunt) {
	'use strict';

	// Configurações de pastas
	var css_path  = 'assets/css/'; //pasta dos arquivos .css
	var js_path   = 'assets/js/'; //pasta dos arquivos .js
	var less_path = 'assets/less/'; //pasta dos arquivos .less

	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),

		// Limpa os arquivos concatenados e minificados para não ocorrer duplicação do código
		clean: {
			css: [ css_path + 'all.css', css_path + 'all.min.css'],
			js: [ js_path + 'concat.js', js_path + 'concat.min.js']
		},

		// Concatena arquivos .js e .css da pasta definida nas configurações
		concat: {
			js: {
				src: js_path + '*.js',
				dest: js_path + 'concat.js'
			},
			css: {
				src: css_path + '*.css',
				dest: css_path + 'all.css'
			}
		},

		// Minifica arquivos .js da pasta definida nas configurações
		min: {
			dist: {
				src: [js_path + 'concat.js'],
				dest: js_path + 'concat.min.js'
			}
		},

		// Minifica arquivos .css da pasta definida nas configurações
		cssmin: {
			dist: {
				src: [css_path + 'all.css'],
				dest: css_path + 'all.min.css'
			}
		},

		validation: {
			options : {
				reset : true,
				reportpath : false,
				stoponerror : true
			},
			files : {
				src : '*.html'
			}
		},

		less: {
			development: {
				files: {
					"assets/css/style.css": [less_path + 'style.less']
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			less: {
				files: [ less_path + '*.less'],
				tasks: ['less']
			},
			css: {
				files: [ css_path + '*.css' ],
				tasks: ['css']
			},
			js: {
				files: [ js_path + '*.js' ],
				tasks: ['js']
			},
			validateHTML : {
				files : ['*.html'],
				tasks : ['validation']
			}
		}

	};

	grunt.initConfig(gruntConfig);

	var keys = Object.keys(gruntConfig);
	var tasks = [];

	for(var i = 1, l = keys.length; i < l; i++) {
		tasks.push(keys[i]);
	}

	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('css', ['clean:css', 'concat:css', 'cssmin']); // Executa tarefas relacionadas a arquivos .CSS
	grunt.registerTask('js', ['clean:js', 'concat:js', 'min']); // Executa tarefas relacionadas apenas a arquivos .JS
	grunt.registerTask('default', tasks);
};