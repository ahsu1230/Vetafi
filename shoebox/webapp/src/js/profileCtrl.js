var app = angular.module('vetafiApp');
app.controller('profileCtrl', ['$scope', 'profileService',
  function($scope, profileService) {
    $scope.userInfo = {};
    $scope.claims = [];
  }
]);
