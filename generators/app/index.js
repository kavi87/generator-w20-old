var generators = require('yeoman-generator'),
    w20Config = {};

var welcome =
    ' __      _________________   ' + '\n' +
    '/  \\    /  \\_____  \\   _  \\  ' + '\n' +
    '\\   \\/\\/   //  ____/  / \\  \\ ' + '\n' +
    ' \\        //       \\  \\_/  /' + '\n' +
    '  \\__/\\__/ \\________\\_____/' + ' generator\n';

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function() {
        console.log(welcome);
	},
	prompting: {
        projectName: function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'name',
                message : 'Your project name ?',
                default : this.appname // Default to current folder name
            }, function (answers) {
                this.log(answers.name);
                done();
            }.bind(this));
        },
        w20Fragments: function() {
            var done = this.async();
            this.prompt({
                type    : 'checkbox',
                name    : 'w20Fragments',
                message : 'W20 fragments to use ?',
                choices : ['w20-core', 'w20-ui', 'w20-compatibility', 'w20-dataviz', 'w20-touch', 'w20-extra'],
                default : ['w20-core', 'w20-ui']
            }, function (answers) {
                this.log(answers.w20Fragments);
                w20Config.fragments = answers.w20Fragments;
                done();
            }.bind(this));
        },
        configureW20Fragments: function() {
            w20Config.fragments.forEach(function(fragments) {
               var done = this.async();
               this.prompt({

               }, function (answers) {

                   done();
               }.bind(this));
            });

        }
	},
	configuring: function() {

	},
	writing : function() {

	},
	conflicts: function() {

	},
	install: function() {
        this.npmInstall();
	},
	end: function() {

	}
});