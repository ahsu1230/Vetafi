'use strict';
var app = angular.module('vetafiApp');
app.controller("signInCtrl", ['$scope', '$location', 'profileService', 'net',
  function ($scope, $location, profileService, net) {

  $scope.atSignupPage = $location.path() == '/signup';
  $scope.atLoginPage = $location.path() == '/login';

  $scope.onClickSubmit = function($event) {
    var progressBar = $($event.currentTarget).find('.vfi-progress');
    if (!_.isEmpty(progressBar)) {
      progressBar.animate({width: '60%'}, 700, function() {
        if ($scope.atSignupPage) {

        } else if ($scope.atLoginPage) {
          var email = $('.vfi-input-email').val();
          var password = $('.vfi-input-password').val();
          net.login(email, password).then(function(resp) {
            debugger;
            if (resp.status == 200) {
              profileService.userInfo = resp.data.user;
              progressBar.animate({width: '100%'}, 300, function() {
                $location.path(resp.data.redirect);
                $scope.$apply();
              });
            } else {
              console.log('Error logging in');
            }
          });

        }
      });
    }
  };

  $scope.$watch(function() {
    return profileService.userInfo;
  }, function(newVal) {
    if (!_.isEmpty(newVal)) {
      $location.path('/');
    }
  });

}]);
