generator-tmpww
===============

> Basic Yeoman generator for TMP projects. Projects are set up to use SASS, and include many best-practices by default.

This generator will scaffold your project, set up Bower, and create basic Grunt tasks that make your life easier while developing.

## Getting Started
This generator assumes that you are connected to the internet and have the following installed:

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)

If not, begin by installing [Node.js](http://nodejs.org/).

Next, install Yo, Bower, and Grunt in one fell swoop by entering the following command in your shell:

```shell
npm install -g yo
```

## Installation
This generator will not be published in the NPM directory. Because of this you will need to clone this repository. Decide where you would like to store this generator and run the following command in that directory:

```shell
git clone https://github.com/sethlopezme/generator-tmpww.git
```

This command will create a new folder called `generator-tmpww` and clone this repository into it. Once the repository has been cloned, `cd` into `generator-tmpww` and link it with the following command:

```shell
npm link
```

Now you're ready to go!

## Using the Generator
### Be Sure to Update
Before you create a new project, it is important that you always have the latest version of this generator, as well as the latest versions of dependencies. In order to update the generator, `cd` into the directory of the generator, and run the following command:

```shell
git pull origin master
```

This should update all of the files in the generator to the latest versions. Next, we want to clear Bower's cache, so we don't pull in cached versions. To do that, run this command:

```shell
bower cache clean
```

Now you're all set to start a new project.

### New Projects
Create a new directory for your project, and open a shell there. To scaffold your project, enter the following command in your shell:

```shell
yo tmpww "Name of Project Here"
```

Yo will ask you a few short questions about yourself and your project. Then it will completely scaffold your project, including Bower dependencies and Grunt tasks.

### Directory Structure
Your directory will look similar to this:

```shell
$ tree
.
├── .sass-cache/
│   └── *
├── build/
├── dev/
│   ├── components/
│   │   ├── css-reset/
│   │   │   └── *
│   │   ├── html5shiv/
│   │   │   └── *
│   │   ├── jquery/
│   │   │   └── *
│   ├── css/
│   │   └── style.css
│   ├── job-images/
│   │   ├── 0000/
│   ├── resources/
│   │   ├── 0000/
│   ├── scss/
│   │   ├── modules/
│   │   │   ├── _all.scss
│   │   │   ├── _functions.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── partials/
│   │   │   ├── _all.scss
│   │   │   ├── _layout.scss
│   │   │   ├── _reset.scss
│   │   │   ├── _tb-required.scss
│   │   │   └── _typography.scss
│   │   ├── vendor/
│   │   └── main.scss
│   └── index.html
├── node_modules/
│   └── *
├── .bowerrc
├── .editorconfig
├── .gitignore
├── bower.json
├── gruntfile.js
└── package.json
```

### Bower
When using Bower, your components will be installed in the `dev/components` directory.

#### Installed Dependencies
Bower will automatically install some dependencies for you. Some are already included in the index.html file.

* HTML5 Shiv
* jQuery
* tmpww-tokens

During installation, Yo will ask you which version of jQuery you would like to install. The default is `jQuery#1.4.2`, but feel free to type any 3-point version or `latest`.

### Grunt
Yeoman will automatically set up Grunt to do the following:

* Tokenize your HTML files
* Compile your SASS
* Run CSSComb and Autoprefixer on your CSS files
* Serve your files locally at `localhost:9000`
* Enable LiveReload
* Optimize and Zip your images
* Build your project

#### Configuration
Feel free to modify and adjust the configuration of your Grunt tasks. You can do so by editing `gruntfile.js` in the root directory of your project. For simplicity, all of your directories can be edited at the top of the gruntfile in the `projectConfig` variable.

For more information on configuring Grunt tasks, see [here](http://gruntjs.com/configuring-tasks).

#### Development
While developing your project, simply run `grunt` from the shell in order to process your SASS and run CSSComb/Autoprefixr on your CSS once.

To have grunt do this automatically for you and enable LiveReload, run `grunt server` from your shell. This will set up your static server on port `9000`, watch your project for changes, and run the appropriate Grunt tasks.

It's usually easier to use a LiveReload extension. For more information on LiveReload, see [here](http://livereload.com/).

#### Deployment

When your project is complete, and you're ready to deploy, run `grunt build` from your shell. This will run all of the optimization tasks and build your project in the `build` directory. All of your deployment-ready files will be in the `build` directory.

## Release History

* 2014-04-16   v0.4.0   Finished up token support. Fixed SASS compiling issues.
* 2014-04-15   v0.3.0   Added support for locally tokenizing SeoAdmin tokens with sample data. Also added a basic SASS structure.
* 2014-04-02   v0.2.1   Updated the grunfile for easy configuration. Also enabled live-reload to inject css into the document.
* 2014-02-24   v0.2.0   Switched from LESS processing to SASS processing.
* 2013-12-15   v0.1.1   Added HTML5 Shiv dependency for Bower.
* 2013-12-15   v0.1.0   Initial commit to Github.
