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

function configureFragment(fragment, context, finished) {
    var that = context;
    var pathToManifest = __dirname + '/../../node_modules/w20/' + fragment.split('-')[1] +'/'+ fragment +'.w20.json';

    that.log('\nConfigure ' + fragment + ': \n');
    w20Project[fragment] = { modules: {} };

    parseW20Manifest(pathToManifest, function(manifest) {
        var prompt = [];
        _.each(manifest.modules, function(moduleDefinition, moduleName) {
            prompt.push({
                type    : 'confirm',
                name    :  moduleName,
                message : 'Configure module ' + moduleName + ' ?',
                default : false
            });
            _.each(manifest.modules[moduleName].configSchema.properties, function(modulePropertyConfig, modulePropertyName) {
                prompt.push({
                    type    : 'input',
                    name    : moduleName + '&&!' + modulePropertyName,
                    message : modulePropertyConfig.description + ' (' + modulePropertyConfig.type + ')',
                    when: function(answers) {
                        return answers[moduleName];
                    }
                })
            });
        });
        var done = that.async();
        that.prompt(prompt, function (answers) {
            _.each(answers, function(value, key) {
                if (key.indexOf('&&!') === -1 && answers[key]) {
                    w20Project[fragment].modules[key] =w20Project[fragment].modules[key] || {};
                } else if (value.length && key.indexOf('&&!') > -1) {
                    var moduleAndProperty = key.split('&&!');
                    w20Project[fragment].modules[moduleAndProperty[0]] = w20Project[fragment].modules[moduleAndProperty[0]] || {};
                    w20Project[fragment].modules[moduleAndProperty[0]][moduleAndProperty[1]] = '';
                    if (typeof manifest.modules[moduleAndProperty[0]].configSchema.properties[moduleAndProperty[1]].type !== 'string') {
                        answers[moduleAndProperty[0] + '&&!' + moduleAndProperty[1]] = JSON.parse(answers[moduleAndProperty[0] + '&&!' + moduleAndProperty[1]]);
                    }
                    w20Project[fragment].modules[moduleAndProperty[0]][moduleAndProperty[1]] = answers[moduleAndProperty[0] + '&&!' + moduleAndProperty[1]];
                }
            });
            that.log('\n ' + fragment + ' module configuration:\n\n');
            that.log(JSON.stringify(w20Project[fragment], null, 4));
            that.log(JSON.stringify(w20Project, null, 4));
            done();
            finished();
        }.bind(that));
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
            var done = this.async();
            configureFragment('w20-core', this, done);
        },
        configureUi: function() {
            if (w20Project.fragments.indexOf('w20-ui') > -1) {
                var done = this.async();
                configureFragment('w20-ui', this, done);
            }
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