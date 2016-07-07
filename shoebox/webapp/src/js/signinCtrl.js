'use strict';
var app = angular.module('vetafiApp');
app.controller("signInCtrl", ['$scope', '$location', 'profileService',
  function ($scope, $location, profileService) {

  $scope.isLoggedIn = profileService.isLoggedIn();
  $scope.atSignupPage = $location.path() == '/signup';
  $scope.atLoginPage = $location.path() == '/login';
  console.log('path: ' + $location.path());

  $scope.onClickSubmit = function($event) {
    var progressBar = $($event.currentTarget).find('.vfi-progress');
    if (!_.isEmpty(progressBar)) {
      progressBar.animate({width: '60%'}, 700, function() {
        progressBar.animate({width: '100%'}, 300);
      });
    }
  };
}]);
