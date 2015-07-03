/* global module: false, grunt: false, process: false */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            'bower_components/**',
            'dist/**',
            'coverage/**'
        ],
        jshint: {
            all: {
                src: ['<%= title %>/modules/**/*.js']
            }
        },
        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },
        karma: {
            test: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            watch: {
                configFile: 'karma.conf.js',
                autoWatch: true
            }
        },
        purifycss: {
            options: {
                rejected: true,
                info: true
            },
            target: {
                src: ['<%= title %>/**/*.js', '<%= title %>/**/*.html'],
                css: ['<%= title %>/style/*.css'],
                dest: '.tmp/<%= title %>-purified.css'
            }
        },
        concat: {
            options: {
                sourceMap: true
            },
            all: {
                src: ['<%= title %>/modules/*.js'],
                dest: '.tmp/<%= title %>-concat.js'
            }
        },
        uglify: {
            all: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: '.tmp/<%= title %>-concat.js.map'
                },
                files: {
                    'dist/<%= title %>.min.js': ['.tmp/<%= title %>-concat.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    base: '.',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-purifycss');

    grunt.registerTask('default', ['jshint', 'bower', 'karma:test', 'concat', 'uglify']);
};
