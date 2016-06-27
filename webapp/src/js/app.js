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