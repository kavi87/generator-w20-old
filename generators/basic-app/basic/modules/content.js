define([
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function(angular) {
    'use strict';

	var module = angular.module('content', []);

	module.controller('ContentController', [ '$scope', function($scope) {
		$scope.users = [ {
			firstName : "Robert",
			lastName : "SMITH"
		}, {
			firstName : "Mary",
			lastName : "POPPINS"
		}, {
			firstName : "John",
			lastName : "CONNOR"
		} ];
	} ]);

	return {
		angularModules : [ 'content' ]
	};
});
