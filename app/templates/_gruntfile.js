module.exports = function(grunt) {
    // Make project configuration changes here
    var projectConfig = {
        banner:
            '/*!\n' + 
            ' * Title:    <%= pkg.name %>\n' + 
            ' * Author:   <%= pkg.author.name %> - <%= pkg.author.location %>\n' + 
            ' *           <%= pkg.author.email %>\n' + 
            ' * Creation: <%= pkg.creation %>\n' + 
            ' */',
        server_port: 9000,
        server_base: 'dev',
        dev: {
            dir: 'dev',
            sass: 'dev/sass',
            css: 'dev/css',
            images: 'dev/job-images/<%= pkg.templateNumber %>',
            components: 'dev/components',
            resources: 'dev/resources'
        },
        build: {
            dir: 'build',
            sass: 'build/sass',
            css: 'build/css',
            images: 'build/job-images/<%= pkg.templateNumber %>',
            components: 'build/components',
            resources: 'build/resources'
        }
    }

    grunt.initConfig({
        // Task configuration
        pkg: grunt.file.readJSON('package.json'),
        projectConfig: projectConfig,
        sass: {
            options: {
                style: 'expanded',
                banner: '<%= projectConfig.banner %>'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.sass %>',
                    src: ['*.scss'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            all: {
                options: {
                    browsers: ['last 4 versions']
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            }
        },
        csscomb: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.dev.css %>',
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
                    cwd: '<%= projectConfig.dev.images %>',
                    src: '*.{png,jpg,gif}',
                    dest: '<%= projectConfig.dev.images %>'
                }]
            }
        },
        clean: ['build'],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.dir %>',
                    src: [
                        '**',
                        '!docs/**'
                    ],
                    dest: '<%= projectConfig.build.dir %>'
                }]
            }
        },
        compress: {
            build: {
                options: {
                    archive: '<%= projectConfig.build.images %>/images.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.images %>',
                    src: ['*.{jpg,png,gif}']
                }]
            }
        },
        watch: {
            html: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.dir %>/**.html']
            },
            sass: {
                files: ['<%= projectConfig.dev.sass %>/**'],
                tasks: ['sass', 'csscomb', 'autoprefixer']
            },
            css: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.css %>/**.css']
            },
            images: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.images %>/*']
            },
            components: {
                files: ['<%= projectConfig.dev.components %>/**']
            },
            resources: {
                files: ['<%= projectConfig.dev.resources %>/**']
            }
        },
        connect: {
            options: {
                port: '<%= projectConfig.server_port %>',
                base: '<%= projectConfig.server_base %>',
                livereload: true
            },
            open: {
                target: 'http://localhost:<%= projectConfig.server_port %>',
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