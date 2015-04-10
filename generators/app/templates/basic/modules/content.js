define([
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function(angular) {
    'use strict';

	var module = angular.module('content', ['ngResource']);

    module.factory('SimpleService', [ '$resource', function($resource) {
        return {
            usersResource: $resource(require.toUrl('{basic}/data/users.json'))
        };
    }]);

	module.controller('ContentController', [ '$scope', function($scope) {

	}]);

	return {
		angularModules : [ 'content' ]
	};
});
