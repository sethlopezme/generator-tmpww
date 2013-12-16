generator-tmpww
===============

> Basic Yeoman generator for TMP projects.

This generator will scaffold your project, set up Bower, and create basic Grunt tasks that make your life easier while developing.

## Getting Started
This generator assumes that you are connected to the internet and have the following installed:

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)

If not, begin by installing [Node.js](http://nodejs.org/).

Next, install Yeoman, Bower, and Grunt in one fell swoop by entering the following command in your shell:

```shell
npm install -g yo
```

## Installation
Currently, this generator is not published in the NPM registry. Because of this you will need to clone this repository. Decide where you would like this generator to live, and create a directory there called `generator-tmpww`. Then open a shell in the new `generator-tmpww` directory, and run the following command:

```shell
git clone https://github.com/sethlopezme/generator-tmpww.git
```

Once this repository has been cloned, link it with the following command:

```shell
npm link
```

Now you're ready to go!

## Using the Generator
Create a new directory for your project, and open a shell there. To scaffold your project, enter the following command in your shell:

```shell
yo tmpww "Name of Project Here"
```

This will completely scaffold your project, including everything that you need for Bower dependencies and Grunt tasks.

### Directory Structure
Your directory will look something like this:

```shell
$ tree
.
├── build/
├── dev/
│   ├── components/
│   │   ├── css-reset/
│   │   │   ├── .bower.json
│   │   │   └── index.css
│   │   └── html5shiv/
│   │   │   ├── dist/
│   │   │   │   ├── html5shiv.js
│   │   │   │   └── html5shiv-printshiv.js
│   │   │   ├── .bower.json
│   │   │   └── readme.md
│   │   └── jquery/
│   │   │   ├── .bower.json
│   │   │   ├── component.json
│   │   │   └── jquery.js
│   ├── css/
│   │   └── style.css
│   ├── images/
│   ├── {less,sass}/
│   │   └── style.{less,sass}
│   └── index.html
├── node_modules/
│   ├── *
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
Bower will automatically install some dependencies for you and they're already included in the index.html file.

* Eric Meyers' CSS Reset
* HTML5 Shiv
* jQuery

During installation, Yeoman will ask you which version of jQuery you would like to install. The default is `jQuery#1.4.2`.

### Grunt
Grunt will be automagically set up by Yeoman to do the following:

* Run CSSComb on your Sass/LESS files
* Compile your Sass/LESS
* Autoprefix your compiled CSS
* Serve your files locally at `localhost:9000`
* Enable LiveReload
* Optimize your images in the `dev/images` directory
* Build your project

#### Configuration
Feel free to modify and adjust the configuration of your Grunt tasks. You can do so by editing `gruntfile.js` in the root directory of your project.

For more information on configuring Grunt tasks, go [here](http://gruntjs.com/configuring-tasks).

#### Development
While developing your project, simply run `grunt` from the shell in order to have grunt run CSSComb, Sass/LESS preprocessing, and autoprefixing tasks.

To have grunt do this automatically for you and enable LiveReload, run `grunt server` from your shell. This will set up your static server on port `9000`, watch your project for changes, and run the appropriate Grunt tasks.

It's usually easier to use a LiveReload extension. For more information on LiveReload, go [here](http://livereload.com/).

#### Deployment

When your project is complete, and you're ready to deploy, run `grunt build` from your shell. This will run all of the optimization tasks, and build your project in the `build` directory. All of your deployment-ready files will be in the `build` directory.

## Release History

* 2013-12-15		v0.1.1			Added HTML5 Shiv dependency for Bower.
* 2013-12-15		v0.1.0			Initial commit to Github.