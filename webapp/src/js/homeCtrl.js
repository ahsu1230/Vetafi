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

