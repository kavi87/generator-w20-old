/*jshint node: true */
/*jshint strict:false */

var welcome =
    ' __      _________________   ' + '\n' +
    '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
    '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
    ' \\        //       \\  \\_/  /' + '\n' +
    '  \\__/\\__/ \\________\\_____/' + '\n';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    fs = require('fs'),
    w20Project = {
        dir: '',
        fragments: [],
        theme: '',
        app: {}
    };

function isRequired(fragment) {
    return w20Project.fragments.indexOf(fragment) > -1;
}

function parseW20Manifest(path, callback) {
    var manifest;
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        manifest = JSON.parse(data);
        callback(manifest);
    });
}

function prompt(config, callback, that) {
    var done = that.async();
    that.prompt(config, function (answers) {
        callback(answers);
        done();
    }.bind(that));
}

function configureFragment(fragment, that, isTheme) {
     var done = that.async(),
         pathToManifest = !isTheme ? __dirname + '/../../node_modules/w20/' + fragment.split('-')[1] +'/'+ fragment +'.w20.json' : __dirname + '/../../node_modules/themes/' + fragment +'/src/main/js/'+ fragment +'.w20.json';

    that.log('\nConfigure ' + fragment + ' (if yes, leave section empty to skip them): \n');
    w20Project.app[fragment] = { modules: {} };

    parseW20Manifest(pathToManifest, function(manifest) {
        var prompt = [];
        _.each(manifest.modules, function(moduleDefinition, moduleName) {
            prompt.push({
                type    : 'confirm',
                name    :  moduleName,
                message : 'Configure module ' + moduleName + ' ?',
                default : true
            });
            if (manifest.modules[moduleName].configSchema && manifest.modules[moduleName].configSchema.properties) {
                _.each(manifest.modules[moduleName].configSchema.properties, function(modulePropertyConfig, modulePropertyName) {
                    prompt.push({
                        type    : 'input',
                        name    : moduleName + '&&!' + modulePropertyName,
                        message : modulePropertyConfig.description + ' (' + modulePropertyConfig.type + ')',
                        when: function(answers) {
                            return answers[moduleName];
                        }
                    });
                });
            }
        });
        that.prompt(prompt, function (answers) {
            _.each(answers, function(value, key) {
                if (key.indexOf('&&!') === -1 && answers[key]) {
                    w20Project.app[fragment].modules[key] = w20Project.app[fragment].modules[key] || {};
                } else if (value.length && key.indexOf('&&!') > -1) {
                    var moduleAndProperty = key.split('&&!'),
                        module = moduleAndProperty[0],
                        property = moduleAndProperty[1];

                    w20Project.app[fragment].modules[module] = w20Project.app[fragment].modules[module] || {};
                    w20Project.app[fragment].modules[module][property] = '';

                    // TODO handle non string type
                    if (manifest.modules[module].configSchema.properties[property].type !== 'string') {
                        answers[module + '&&!' + property] = JSON.parse(answers[module + '&&!' + property].replace(/'/g, '"'));
                    }

                    w20Project.app[fragment].modules[module][property] = answers[module + '&&!' + property];
                }
            });
            that.log('\n ' + fragment + ' module configuration:\n\n');
            that.log(JSON.stringify(w20Project.app[fragment], null, 4));
            that.log(JSON.stringify(w20Project, null, 4));
            done();
        }.bind(that));
    });
}

function addCustomFragment(that) {
    var getCustomFragments = function (fragments, callback) {
        that.prompt({
            type: 'input',
            name: 'customFragment',
            message: 'Enter a custom fragment name:'
        }, function (reply) {
            if (reply.customFragment) {
                fragments.push(reply.customFragment);
            } else {
                that.log('\nName was empty. Fragment was not added\n');
            }
            that.prompt({
                type: 'confirm',
                name: 'confirmed',
                message: 'Do you want to add another custom fragment ?',
                default: true
            }, function (reply) {
                if (reply.confirmed) {
                    getCustomFragments(fragments, function (fragment) {
                        callback(fragment);
                    });
                } else {
                    callback(fragments);
                }
            });
        });
    };

    getCustomFragments([], function (fragments) {
        w20Project.customFragments = fragments;
        that.log(JSON.stringify(w20Project, null, 4));
    });
}

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function() {
        this.log(welcome);
	},
	prompting: {
        dirName: function() {
            prompt({
                type    : 'input',
                name    : 'dir',
                message : 'Your project directory name ?',
                default : this.appname
            }, function (answers) {
                w20Project.dir = answers.dir;
            }, this);
        },
        requiredw20Fragments: function() {
            prompt({
                type    : 'checkbox',
                name    : 'w20Fragments',
                message : 'W20 fragments to use (aside w20-core) ? ',
                choices : ['w20-ui', 'w20-dataviz', 'w20-touch', 'w20-extra'],
                default : ['w20-ui']
            }, function (answers) {
                w20Project.fragments = answers.w20Fragments.concat(['w20-core']);
            }, this);
        },
        configureCore: function() {
            configureFragment('w20-core', this);
        },
        configureUi: function() {
            if (isRequired('w20-ui')) { configureFragment('w20-ui', this); }
        },
        configureDataviz: function() {
            if (isRequired('w20-dataviz')) { configureFragment('w20-dataviz', this); }
        },
        configureTouch: function() {
            if (isRequired('w20-touch')) { configureFragment('w20-touch', this); }
        },
        configureExtra: function() {
            if (isRequired('w20-extra')) { configureFragment('w20-extra', this); }
        },
        theme: function() {
            prompt({
                type    : 'list',
                name    : 'theme',
                message : 'Use a W20 theme ?',
                choices : ['w20-simple-theme', 'w20-psa-manufacturing-theme', 'w20-brand-theme', 'none'],
                default : ['w20-simple-theme']
            }, function (answers) {
                w20Project.theme = answers.theme;
                if (w20Project.theme !== 'none') {
                    w20Project.fragments.push(w20Project.theme);
                }
            }, this);
        },
        configureTheme: function() {
            if (isRequired(w20Project.theme)) { configureFragment(w20Project.theme, this, true); }
        },
        customFragment: function() {
            addCustomFragment(this);
        }
	},
	configuring: function() {

	},
	writing : function() {

	},
	conflicts: function() {

	},
	install: function() {
       // this.npmInstall();
	},
	end: function() {

	}
});