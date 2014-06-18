module.exports = function(grunt) {


    grunt.initConfig({
        watch: {
            files: ['src/**/*.coffee', 'src/**/*.handlebars', 'src/**/*.less'],
            tasks: 'default'
        },
        handlebars: {
            compile: {
                options: {
                  namespace: "templates"
                },
                files: {
                  "build/templates/templates.js": ["src/templates/*.handlebars"]
                }
            }
        },
        coffee: {
            compile: {
                options: {
                    join: true,
                    bare: true
                },
                
                files: [
                    {
                        src: ['src/scripts/*.coffee'],
                        dest:'build/scripts/sources.js'
                    }
                ]
            }
        },
        concat: {
            dist: {
                options: {
                    banner: 'var Bookmarklet = (function(global) {\n"use strict";\nglobal = this;\n',
                    footer: 'override.init();\nreturn {override: override, ogp: ogp, Handlebars: Handlebars};}).apply({});'
                },
                src: ['lib/**/*.js', 'build/scripts/sources.js', 'build/templates/templates.js'],
                dest: 'build/override.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    mangle: true
                },
                files: [
                    {
                        src: 'build/override.js', dest: 'build/override.min.js'
                    }
                ]
            }
        },
        less: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/styles/',
                        src: ['*.less', '!mixins.less'], // All less files except mixins.less
                        dest: 'build/styles/',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            minify: { 
                files: [
                    {
                        expand: true,
                        cwd: 'build/styles/',
                        src: ['*.css', '!*.min.css'],
                        dest: 'build/styles/',
                        ext: '.min.css'
                    }
                ]
            }
        },
        includereplace: {
            dist: {
                options: {
                    
                },
                src: 'build/*.js',
                dest: './'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('default', ['handlebars', 'coffee', 'concat', 'uglify', 'less', 'cssmin', 'includereplace']);
};

