'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;


var TmpwwGenerator = module.exports = function TmpwwGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        console.log("\n\nAll dependencies have been installed! Running Grunt...\n\n");
        exec("grunt");
        console.log("All done!");
      }
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.today = new Date();
  this.fullDate = this.today.getFullYear();
  this.fullDate += '-' + (this.today.getUTCMonth() + 1);
  this.fullDate += '-' + this.today.getDate();
};

util.inherits(TmpwwGenerator, yeoman.generators.Base);

TmpwwGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log("I just have a few questions to ask... It won't hurt. I promise.\n");

  var prompts = [{
    type: 'input',
    name: 'devName',
    message: 'What is your name?'
  },
  {
    type: 'input',
    name: 'devEmail',
    message: 'What is your TMP email address?'
  },
  {
    type: 'input',
    name: 'devLocation',
    message: 'Which TMP office are you located in?'
  },
  {
    type: 'input',
    name: 'jQueryVer',
    message: "Which version of jQuery would you like? Use 'latest' for the most recent.",
    default: '1.4.2'
  }];

  this.prompt(prompts, function (props) {
    this.devName = props.devName;
    this.devEmail = props.devEmail;
    this.devLocation = props.devLocation;
    this.jQueryVer = props.jQueryVer;

    cb();
  }.bind(this));
};

TmpwwGenerator.prototype.folders = function folders() {
  this.mkdir('dev');
  this.mkdir('dev/css');
  this.mkdir('dev/less');
  this.mkdir('dev/images');
  this.mkdir('build');
};

TmpwwGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

TmpwwGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
  this.template('_.bowerrc', '.bowerrc')
};

TmpwwGenerator.prototype.gruntfile = function gruntfile() {
  this.template('_gruntfile.js', 'gruntfile.js');
};

TmpwwGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

TmpwwGenerator.prototype.gitIgnore = function gitIgnore() {
  this.copy('_.gitignore', '.gitignore');
};

TmpwwGenerator.prototype.projectFiles = function projectFiles() {
  this.template('_index.html', 'dev/index.html');
  this.template('_style.less', 'dev/less/style.less');
};
