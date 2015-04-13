/*jshint node: true */
'use strict';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    prettyjson = require('prettyjson'),
    defaultConfig = require('./default-config'),
    welcome =
        ' __      _________________   ' + '\n' +
        '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
        '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
        ' \\        //       \\  \\_/  /' + '\n' +
        '  \\__/\\__/ \\________\\_____/' + '\n';


var w20Project = {
    fragment: '',
    w20Fragments: [],
    w20App: {}
};

module.exports = generators.Base.extend({

    _print: function (msg) {
        this.log('\n' + msg + '\n');
    },

    _prompt: function (config, callback) {
        var that = this;

        var done = that.async();
        that.prompt(config, function (answers) {

            callback(answers);
            done();

        }.bind(that));
    },

    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    initializing: function () {
        this.log(welcome);
    },

    prompting: {

        fragment: function () {
            var that = this;

            that._prompt({
                type: 'input',
                name: 'name',
                message: 'Your project fragment name ?',
                default: this.appname
            }, function (answers) {

                w20Project.fragment = answers.name;

            }, that);
        },

        w20Fragments: function () {
            var that = this;

            that._prompt({
                type: 'checkbox',
                name: 'w20Fragments',
                message: 'W20 fragments to use aside core ? ',
                choices: ['ui', 'dataviz', 'touch', 'extra'],
                default: ['ui']
            }, function (answers) {

                w20Project.w20Fragments = answers.w20Fragments.concat(['core']);

            }, that);
        },

        theme: function () {
            var that = this;

            that._prompt({
                type: 'list',
                name: 'theme',
                message: 'Use a W20 theme ?',
                choices: ['w20-business-theme', 'none'],
                default: ['w20-business-theme']
            }, function (answers) {

                w20Project.w20Fragments = w20Project.w20Fragments.concat(answers.theme);

            }, that);
        }
    },

    configuring: function () {
        this._print('Configuring application...');

        var that = this;

        // Set the home view path
        defaultConfig.core.definition.modules.application.home = '/' + w20Project.fragment + '/' + 'content';

        _.each(w20Project.w20Fragments, function (fragment) {
            var fragmentConf = defaultConfig[fragment];

            if (fragmentConf) {
                w20Project.w20App[fragmentConf.path] = fragmentConf.definition;
            }

        });

        // Add the user fragment
        w20Project.w20App[w20Project.fragment + '/' + w20Project.fragment + '.w20.json'] = {};
    },
    writing: function () {
        this._print('Writing...');

        var that = this,
            tplContext = { title: w20Project.fragment };

        that.fs.copyTpl(
            this.templatePath('root'),
            this.destinationPath('.'),
            tplContext
        );

        that.fs.copyTpl(
            this.templatePath('basic-fragment'),
            this.destinationPath(w20Project.fragment),
            tplContext
        );

        that.fs.copyTpl(
            this.templatePath('basic-fragment.w20.json'),
            this.destinationPath(w20Project.fragment + '/' + w20Project.fragment + '.w20.json'),
            tplContext
        );

        that.fs.write(this.destinationPath('w20.app.json'), JSON.stringify(w20Project.w20App, null, 4));
    },
    conflicts: function () {

    },
    install: function () {
        this._print('Installing dependencies...');
        this.bowerInstall();
    },
    end: function () {
        this._print('Done.');
    }
});