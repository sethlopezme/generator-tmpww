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
        browsers: 'last 4 versions',
        dev: {
            dir: 'dev',
            sass: 'dev/scss',
            css: 'dev/css',
            images: 'dev/job-images/<%= pkg.templateNumber %>',
            components: 'dev/components',
            resources: 'dev/resources'
        },
        build: {
            dir: 'build',
            sass: 'build/scss',
            css: 'build/css',
            images: 'build/job-images/<%= pkg.templateNumber %>',
            components: 'build/components',
            resources: 'build/resources'
        },
        server_port: 9000,
        server_base: 'dev'
    }

    grunt.initConfig({
        // Task configuration
        pkg: grunt.file.readJSON('package.json'),
        projectConfig: projectConfig,
        sass: {
            dev: {
                options: {
                    sourcemap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.sass %>',
                    src: ['*.scss'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    banner: '<%= projectConfig.banner %>',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.sass %>',
                    src: ['*.scss'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['<%= projectConfig.browsers %>']
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    browsers: ['<%= projectConfig.browsers %>']
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        csscomb: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.css %>',
                    src: ['*.css'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 1
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.images %>',
                    src: '*.{png,jpg,gif}',
                    dest: '<%= projectConfig.build.images %>'
                }]
            }
        },
        clean: ['<%= projectConfig.build.dir %>'],
        copy: {
            tokenize :{
                options: {
                    process: function(content, srcPath) {
                        var log = '';
                        // Setup the default token configuration
                        var tokenConfig = {
                            page: 'default',
                            options: 'none'
                        }
                        // Grab the body element
                        var bodyAttributes = /<body (.*)?>/i.exec(content)[1];

                        // Set the token configuration based on the body attributes
                        if(bodyAttributes != "(.*)?") {
                            bodyAttributes = bodyAttributes.split(/\W\s+/ig);

                            for(var i = 0; i < bodyAttributes.length; i++) {
                                bodyAttributes[i] = bodyAttributes[i].split('=');
                                bodyAttributes[i][1] = bodyAttributes[i][1].replace(/[^\w\s-]/ig, '').split(' ');

                                if(bodyAttributes[i][0] == 'id' && bodyAttributes[i][1].length == 1) {
                                    tokenConfig.page = bodyAttributes[i][1];
                                } else if(bodyAttributes[i][0] == 'data-config' && bodyAttributes[i][1].length > 0) {
                                    tokenConfig.options = bodyAttributes[i][1];
                                }
                            }
                        }

                        // Tell the user what page and configuration options were detected
                        log += '\nTokenizing Page: ' + tokenConfig.page + '\n';
                        log += 'Token Options: ';
                        if(typeof(tokenConfig.options) != "string") {
                            for(var i = 0; i < tokenConfig.options.length; i++) {
                                if(i > 0) log += ', ';
                                log += tokenConfig.options[i];
                            }
                        } else {
                            log += tokenConfig.options + '\n';
                        }
                        log += '\n';
                        console.log(log);

                        // Begin the tokenization
                        return content.replace(/<!--\*\*(.*?)\*\*-->/ig, function(match, p1, offset, string) {
                            // Grab the token directory
                            var tokenDir = grunt.config.get('projectConfig.dev.components') + '/tmpww-tokens/**/';
                            // Set the options for grunt.file.expand
                            var options = {
                                filter: 'isFile'
                            }
                            // Modify the token name as needed
                            switch(p1) {
                                // By Token
                                case 'AdvancedSearchTag':
                                    if(typeof(tokenConfig.options) !== 'string' && tokenConfig.options.indexOf('radius') !== -1) {
                                        p1 = p1 + '-WithRadius';
                                    }

                                    break;
                                case 'RecentOpeningsHTML':
                                    if(tokenConfig.page == 'jobPage') {
                                        p1 = p1 + '-JobPage';
                                    }

                                    break;
                                default:
                                    break;
                            }

                            // Define the token we are looking for
                            var files = [
                                tokenDir + p1 + '.token.html'
                            ]
                            // Grab the token matches
                            var matches = grunt.file.expand(options, files);
                            // Build the output string for the user
                            var log = '-- ' + p1 + ': ';

                            // For each of the tokens
                            if(matches.length > 0) {
                                log += "Done.";
                                console.log(log);

                                for(var i = 0; i < matches.length; i++) {
                                    return grunt.file.read(matches[i]);
                                }
                            } else {
                                log += "TOKEN NOT FOUND!";
                                console.log(log);
                                return '';
                            }
                        });
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.dir %>',
                    src: ['*.pre.html'],
                    dest: '<%= projectConfig.dev.dir %>',
                    ext: '.html'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.dir %>',
                    src: ['**'],
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
        connect: {
            options: {
                port: '<%= projectConfig.server_port %>',
                base: '<%= projectConfig.server_base %>',
                livereload: true
            },
            open: true
        },
        watch: {
            html: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.dir %>/**.html'],
                tasks: ['copy:tokenize']
            },
            sass: {
                files: ['<%= projectConfig.dev.sass %>/**'],
                tasks: ['sass:dev', 'csscomb:dev', 'autoprefixer:dev']
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
        }
    });

    // Automagically load all Grunt NPM tasks
    require("load-grunt-tasks")(grunt);

    // Register task groups
    grunt.registerTask('default', [
        'sass:dev',
        'csscomb:dev',
        'autoprefixer:dev',
        'copy:tokenize'
    ]);
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean',
        'copy:build',
        'sass:build',
        'csscomb:build',
        'autoprefixer:build',
        'imagemin',
        'compress'
    ]);

};
