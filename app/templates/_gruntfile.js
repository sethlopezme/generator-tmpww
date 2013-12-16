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
        less: {
            dev: {
                files: {
                    'dev/css/style.css': ['dev/less/style.less']
                },
                options: {
                    compress: true,
                    relativeUrls: true,
                    report: 'gzip'
                }
            },
            build: {
                files: {
                    'dev/css/style.css': ['dev/less/style.less']
                },
                options: {
                    compress: true,
                    relativeUrls: true,
                    report: 'gzip'
                }
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
            css: {
                files: ['dev/less/*'],
                tasks: ['csscomb', 'less:dev', 'autoprefixer']
            },
            images: {
                files: ['dev/images/*']
            }
        },
        connect: {
            options: {
                port: 9000,
                base: 'dev',
                livereload: true
            },
            open: {
                target: 'http://localhost:<%= connect.options.port %>',
                appName: 'open'
            }
        }
    });

    // Automagically load all Grunt NPM tasks
    require("load-grunt-tasks")(grunt);

    // Register task groups
    grunt.registerTask('default', [
        'less:dev',
        'csscomb',
        'autoprefixer'
    ]);
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [
        'csscomb',
        'less:build',
        'autoprefixer',
        'imagemin',
        'clean',
        'copy:build'
    ]);

};
