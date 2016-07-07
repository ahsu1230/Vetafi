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
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/home.html"
    }).when("/faq", {
        templateUrl: "templates/faq.html"
    }).when("/signup", {
        templateUrl: "templates/signin.html"
    }).when("/login", {
        templateUrl: "templates/signin.html"
    }).when("/profile", {
        templateUrl: "templates/profile.html"
    }).when("/page-not-found", {
        templateUrl: "templates/pageNotFound.html"
    }).otherwise({
        redirectTo: '/'
    });

    // use HTML5 History API (also removes '#' in url)
    $locationProvider.html5Mode(true);
});
