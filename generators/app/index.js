'use strict';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    fs = require('fs'),
    w20Project = {};

var welcome =
    ' __      _________________   ' + '\n' +
    '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
    '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
    ' \\        //       \\  \\_/  /' + '\n' +
    '  \\__/\\__/ \\________\\_____/' + ' generator\n';

function parseW20Manifest(path, callback) {
    var manifest;
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        manifest = JSON.parse(data);
        callback(manifest);
    });
}

// hello

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function() {
        this.log(welcome);
	},
	prompting: {
        projectName: function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'name',
                message : 'Your project name ?',
                default : this.appname
            }, function (answers) {
                w20Project.name = answers.name;
                done();
            }.bind(this));
        },
        w20Fragments: function() {
            var done = this.async();
            this.prompt({
                type    : 'checkbox',
                name    : 'w20Fragments',
                message : 'W20 fragments to use (aside w20-core) ? ',
                choices : ['w20-ui', 'w20-compatibility', 'w20-dataviz', 'w20-touch', 'w20-extra'],
                default : ['w20-ui']
            }, function (answers) {
                w20Project.fragments = answers.w20Fragments.concat(['w20-core']);
                done();
            }.bind(this));
        },
        configureCore: function() {
            var that = this;
            var pathToManifest = __dirname + '/../../node_modules/w20/core/w20-core.w20.json';

            this.log('\nConfigure w20-core: \n');
            w20Project['w20-core'] = { modules: {} };

            parseW20Manifest(pathToManifest, function(manifest) {
                var prompt = [];
                _.each(manifest.modules, function(moduleDefinition, moduleName) {
                    w20Project['w20-core'].modules[moduleName] = {};
                    prompt.push({
                        type    : 'confirm',
                        name    :  moduleName,
                        message : 'Configure module ' + moduleName + ' ?',
                        default : false
                    });
                    _.each(manifest.modules[moduleName].configSchema.properties, function(modulePropertyConfig, modulePropertyName) {
                       w20Project['w20-core'].modules[moduleName][modulePropertyName] = '';
                       prompt.push({
                           type    : 'input',
                           name    : moduleName + '&&' + modulePropertyName,
                           message : modulePropertyConfig.description + '(' + modulePropertyConfig.type + ')',
                           when: function(answers) {
                               return answers[moduleName];
                           }
                       })
                    });
                });
                var done = that.async();
                that.prompt(prompt, function (answers) {
                    _.each(answers, function(value, key) {
                        if (key.indexOf('&&') > -1) {
                            var moduleAndProperty = key.split('&&');
                            w20Project['w20-core'].modules[moduleAndProperty[0]][moduleAndProperty[1]] = answers[moduleAndProperty[0] + '&&' + moduleAndProperty[1]];
                        }
                    });
                    that.log(JSON.stringify(w20Project));
                    done();
                }.bind(that));
            });


   /*            var done = that.async();
               that.log('Configure ' + fragment + ' fragment:\n');
               w20Project[fragment] = { modules: {} };
               var pathToManifest = __dirname + '/../../node_modules/w20/' + fragment.split('-')[1] + '/' + fragment + '.w20.json';
               parseW20Manifest(pathToManifest, function(manifest) {
                   _.each(manifest.modules, function(module) {
                        w20Project[fragment].modules[module] = {};
                        var done = that.async();
                        that.prompt({
                            type    : 'confirm',
                            name    : 'isYes',
                            message : 'Configure module ' + module + ' ?',
                            default : false
                        }, function (answer) {
                            if (answer.isYes) {
                *//*                that.log('Configuring ' + module);
                                _.each(module.configSchema.properties, function(config, key) {
                                    var doneModule = that.async();
                                    that.prompt({
                                        type    : 'input',
                                        name    : configValue,
                                        message : config.description + '(' + config.type + ')'
                                    }, function (answer) {
                                        w20Project[fragment].modules[module][key] = answer.configValue;
                                        that.log(JSON.stringify(w20Project));
                                        done();
                                    }.bind(that));
                                });*//*
                            }
                            done();
                        }.bind(this));
                    });
                   done();
               });*/


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