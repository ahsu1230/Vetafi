/**
 * Main AngularJS Web Application Declaration
 */
'use strict';

var app = angular.module('vetafiApp', [
    'ngRoute'
]);

/**
 * Configure routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/home.html"
    }).when("/faq", {
        templateUrl: "templates/faq.html"
    }).when("/signin", {
        templateUrl: "templates/signin.html"
    }).when("/login", {
        templateUrl: "templates/login.html"
    }).when("/page-not-found", {
        templateUrl: "templates/pageNotFound.html"
    }).otherwise({
        redirectTo: '/'
    });
}]);
var app = angular.module('vetafiApp');
app.controller('faqCtrl', ['$scope', function($scope) {
    
}]);


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
var app = angular.module('vetafiApp');
app.controller('homeCtrl', ['$scope', function($scope) {
  $scope.links = [
    {
        title:'View Health Resources',
        url:'#/faq'
    },
    {
        title:'File a Health Claim',
        url:'signin?action=file'
    },
    {
        title:'View your Health Status',
        url:'signin?action=profile'
    }
  ];
}]);

