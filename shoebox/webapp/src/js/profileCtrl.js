var app = angular.module('vetafiApp');
app.controller('profileCtrl', ['$scope', '$location', 'profileService', 'net', 'modalService',
  function($scope, $location, profileService, net, modalService) {
    $scope.userInfo = {};
    $scope.claims = [];

    $scope.clickEdit = function() {
      debugger;
      modalService.activateModal();
    };

    $scope.clickLogout = function() {
      console.log('logging out!');
      net.logout().then(function(resp) {
        sessionStorageHelper.removePair(vfiConstants.keyUserId);
        profileService.userInfo = {};
        if (resp.status == 200) {
          $location.path('/');
        }
      });
    };

    $scope.clickDeleteAccount = function() {
      console.log('delete account!!');
      sessionStorageHelper.removePair(vfiConstants.keyUserId);
      profileService.userInfo = {};
      debugger;
    };
  }
]);
