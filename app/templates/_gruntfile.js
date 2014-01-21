module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        csscomb: {
            all: {
                files: {
                    'dev/css/style.css': ['dev/css/style.css']
                }
            }
        },
        sass: {
            all: {
                options: {
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'dev/sass',
                    src: ['*.scss'],
                    dest: 'dev/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            all: {
                options: {
                    browsers: ['last 3 versions']
                },
                files: {
                    'dev/css/style.css': ['dev/css/style.css']
                }
            }
        },
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 1
                },
                files: [{
                    expand: true,
                    cwd: 'dev/images',
                    src: '*.{png,jpg,gif}',
                    dest: 'dev/images/'
                }]
            }
        },
        clean: ['build'],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**'],
                    dest: 'build/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            html: {
                files: ['dev/**.html']
            },
            css: {
                files: ['dev/less/*'],
                tasks: ['less:dev', 'autoprefixer', 'csscomb']
            },
            images: {
                files: ['dev/images/*']
            },
            components: {
                files: ['dev/components/**']
            }
        },
        connect: {
            options: {
                port: 9000,
                base: 'dev',
                livereload: true
            },
            open: {
                target: 'http://localhost:9000',
                appName: 'open'
            }
        }
    });

    // Automagically load all Grunt NPM tasks
    require("load-grunt-tasks")(grunt);

    // Register task groups
    grunt.registerTask('default', [
        'sass',
        'csscomb',
        'autoprefixer'
    ]);
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [
        'csscomb',
        'sass',
        'autoprefixer',
        'imagemin',
        'clean',
        'copy:build'
    ]);

};
