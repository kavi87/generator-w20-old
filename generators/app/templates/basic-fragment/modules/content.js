define([
    'require',
    '{angular}/angular',
    '{angular-resource}/angular-resource'

], function (require, angular) {
    'use strict';

	var module = angular.module('content', ['ngResource']);

    module.factory('DataService', [ '$resource', function($resource) {
        return  $resource(require.toUrl('{${ title }}/data/data.json'));
    }]);

	module.controller('ContentController', [ '$scope', 'DataService', function($scope, dataService) {

        dataService.get(function (data) {
            $scope.version = data.version;
        });

	}]);

	return {
		angularModules : [ 'content' ]
	};
});
