'use strict';
var app = angular.module('vetafiApp');
app.controller("headerCtrl", ['$scope', 'profileService',
	function ($scope, profileService) {
		$scope.isLoggedIn = false;

		$scope.$watch(function () {
			return profileService.userInfo;
		}, function (newVal) {
			if (_.isEmpty(newVal)) {
				$scope.isLoggedIn = false;
			} else {
				$scope.isLoggedIn = true;
			}
		});
	}
]);
