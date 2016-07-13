var app = angular.module('vetafiApp');
app.controller('profileCtrl', ['$scope', 'profileService', 'net', 'modalService',
  function($scope, profileService, net, modalService) {
    $scope.userInfo = {};
    $scope.claims = [];

    $scope.clickEdit = function() {
      debugger;
      modalService.activateModal();
    };

    $scope.clickLogout = function() {
      console.log('logging out!');
      net.logout().then(function(resp) {
        debugger;
      });
    };

    $scope.clickDeleteAccount = function() {
      console.log('delete account!!');
      debugger;
    };
  }
]);
