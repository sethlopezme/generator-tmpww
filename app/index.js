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

  // Have Yeoman greet the user.
  console.log(this.yeoman);
  console.log("I just have a few questions to ask... It won't hurt. I promise.\n");

  var prompts = [{
    type: 'input',
    name: 'authorName',
    message: 'What is your name?'
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'What is your TMP email address?'
  },
  {
    type: 'input',
    name: 'authorLocation',
    message: 'Which TMP office are you located in?'
  },
  {
    type: 'input',
    name: 'templateNumber',
    message: 'What is the template number for this project?',
    default: '0000'
  },
  {
    type: 'input',
    name: 'jQueryVer',
    message: "Which version of jQuery would you like? Use 'latest' for the most recent.",
    default: '1.4.2'
  }];

  this.prompt(prompts, function (props) {
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.authorLocation = props.authorLocation;
    this.templateNumber = props.templateNumber;
    this.jQueryVer = props.jQueryVer;

    cb();
  }.bind(this));
};

TmpwwGenerator.prototype.folders = function folders() {
  this.mkdir('dev');
  this.mkdir('dev/css');
  this.mkdir('dev/scss');
  this.mkdir('dev/scss/modules');
  this.mkdir('dev/scss/partials');
  this.mkdir('dev/scss/vendor');
  this.mkdir('dev/job-images');
  this.mkdir('dev/job-images/' + this.templateNumber);
  this.mkdir('dev/resources/' + this.templateNumber);
  this.mkdir('dev/components');
  this.mkdir('build');
};

TmpwwGenerator.prototype.projectFiles = function projectFiles() {
  // Git
  this.copy('_.gitignore', '.gitignore');

  // EditorConfig
  this.copy('_.editorconfig', '.editorconfig');

  // Node
  this.template('_package.json', 'package.json');

  // Grunt
  this.copy('_gruntfile.js', 'gruntfile.js');

  // Bower
  this.template('_.bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');

  // Project
  this.template('_dev/_index.pre.html', 'dev/index.pre.html');
  this.copy('_dev/_scss/_main.scss', 'dev/scss/main.scss');
  this.copy('_dev/_scss/_modules/_all.scss', 'dev/scss/modules/all.scss');
  this.copy('_dev/_scss/_modules/_functions.scss', 'dev/scss/modules/functions.scss');
  this.copy('_dev/_scss/_modules/_mixins.scss', 'dev/scss/modules/mixins.scss');
  this.copy('_dev/_scss/_modules/_variables.scss', 'dev/scss/modules/variables.scss');
  this.copy('_dev/_scss/_partials/_all.scss', 'dev/scss/partials/all.scss');
  this.copy('_dev/_scss/_partials/_layout.scss', 'dev/scss/partials/layout.scss');
  this.copy('_dev/_scss/_partials/_reset.scss', 'dev/scss/partials/reset.scss');
  this.copy('_dev/_scss/_partials/_tb-required.scss', 'dev/scss/partials/tb-required.scss');
  this.copy('_dev/_scss/_partials/_typography.scss', 'dev/scss/partials/typography.scss');
};
