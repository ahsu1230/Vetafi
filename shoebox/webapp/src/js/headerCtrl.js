'use strict';
var app = angular.module('vetafiApp');
app.controller("HeaderCtrl", ['$scope', function ($scope) {
	$scope.links = [
		{
			title: 'Health Resources',
			href: '/#/faq'
		},
		{
			title: 'Profile',
			href: '/#/profile'
		},
		{
			title: 'Sign in',
			href: '/#/signin'
		}
	];
}]);