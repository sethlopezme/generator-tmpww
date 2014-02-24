module.exports = function(grunt) {

    grunt.initConfig({
        // Task configuration
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                style: 'expanded',
                sourcemap: true
            },
            all: {
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
                files: [{
                    expand: true,
                    cwd: 'dev/css',
                    src: ['*.css'],
                    dest: 'dev/css',
                    ext: '.css'
                }]
            }
        },
        csscomb: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'dev/css',
                    src: ['*.css'],
                    dest: 'dev/css',
                    ext: '.css'
                }]
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
                    dest: 'dev/images'
                }]
            }
        },
        clean: ['build'],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**', '!sass/**'],
                    dest: 'build/'
                }]
            }
        },
        compress: {
            build: {
                options: {
                    archive: 'build/images/<%= _.slugify(name) %>-images.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: 'build/images',
                    src: ['*.{jpg,png,gif}']
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
                files: ['dev/sass/*'],
                tasks: ['sass', 'autoprefixer', 'csscomb']
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
        'sass',
        'csscomb',
        'autoprefixer',
        'imagemin',
        'clean',
        'copy:build',
        'compress:build'
    ]);

};