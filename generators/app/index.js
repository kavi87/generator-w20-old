/*jshint node: true */
'use strict';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    async = require('async'),
    fs = require('fs'),
    welcome =
    ' __      _________________   ' + '\n' +
    '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
    '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
    ' \\        //       \\  \\_/  /' + '\n' +
    '  \\__/\\__/ \\________\\_____/' + '\n';


var w20Project =  {
    appName: '',
    fragments: [],
    theme: '',
    app: {}
};

module.exports = generators.Base.extend({

    _prompt: function (config, callback) {
        var that = this;

        var done = that.async();
        that.prompt(config, function (answers) {

            callback(answers);
            done();

        }.bind(that));
    },

	constructor: function() {
		generators.Base.apply(this, arguments);
        this.option('psa');
	},

	initializing: function() {
        this.log(welcome);
	},

	prompting: {

        appName: function() {
            var that = this;

            that._prompt({
                type    : 'input',
                name    : 'name',
                message : 'Your project name ? (default to current folder name)',
                default : this.appname
            }, function (answers) {

                    w20Project.directory = answers.name;

            }, that);
        },

        fragments: function() {
            var that = this;

            var choices = ['ui', 'dataviz', 'touch', 'extra'];
            if (that.options.psa) {
                choices = choices.concat(['compatibility']);
            }

            that._prompt({
                type    : 'checkbox',
                name    : 'fragments',
                message : 'W20 fragments to use aside core ? ',
                choices : choices,
                default : ['ui']
            }, function (answers) {

                    w20Project.fragments = answers.fragments.concat(['core']);

            }, that);
        },

        theme: function() {
            var that = this;

            var choices = ['w20-business-theme', 'none'];
            if (that.options.psa) {
                choices = choices.concat(['w20-simple-theme', 'w20-psa-manufacturing-theme', 'w20-brand-theme']);
            }

            that._prompt({
                type    : 'list',
                name    : 'theme',
                message : 'Use a W20 theme ?',
                choices : choices,
                default : ['w20-business-theme']
            }, function (answers) {

                    w20Project.theme = answers.theme;

            }, that);
        }
	},

	configuring: function() {
        var that = this;

        _.each(w20Project.fragments, function(fragment) {

        });
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