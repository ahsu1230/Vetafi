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
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/home.html"
    }).when("/faq", {
        templateUrl: "templates/faq.html"
    }).when("/profile", {
        templateUrl: "templates/profile.html"
    }).when("/start-file-claim", {
        templateUrl: "templates/startFileClaim.html"
    }).otherwise({
        redirectTo: '/'
    });
});

var app = angular.module('vetafiApp');
app.controller('faqCtrl', ['$scope', function($scope) {

}]);

'use strict';
var app = angular.module('vetafiApp');
app.controller("headerCtrl", ['$scope', 'profileService', 'net',
	function ($scope, profileService, net) {
		$scope.isLoggedIn = false;

		if (sessionStorageHelper.getPair(vfiConstants.keyUserId)) {
			net.getUserInfo().then(function(resp) {
				var user = resp.data.user;
				profileService.userInfo = user;
			});
		}

		//
		// Watchers
		//
		$scope.$watch(function () {
			return profileService.userInfo;
		}, function (newVal) {
			if (_.isEmpty(newVal)) {
				$scope.isLoggedIn = false;
			} else {
				$scope.isLoggedIn = true;
			}
		});
	}
]);

var app = angular.module('vetafiApp');
app.controller('homeCtrl', ['$scope', 'profileService',
  function($scope, profileService) {
    $scope.isLoggedIn = false;

		$scope.$watch(function () {
			return profileService.userInfo;
		}, function (newVal) {
			if (_.isEmpty(newVal)) {
				$scope.isLoggedIn = false;
			} else {
				$scope.isLoggedIn = true;
			}
		});
  }
]);

'use strict';
var app = angular.module('vetafiApp');
app.factory('modalService', function() {
  return {
    activateModal: function(path, scopeData) {
      debugger;
    }
  }
});

'use strict';
var app = angular.module('vetafiApp');
app.factory('net', ['$http', function($http) {
  var baseUrl = "http://localhost:3999";

  var get = function (url, data) {
    return $http({
      url: baseUrl + url,
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
  };

  var post = function(url, data) {
    return $http({
      url: baseUrl + url,
      method: "POST",
      data: data || {},
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return {
    login: function (email, password) {
      var data = {
        email: email,
        password: password
      };
      return post("/auth/login", data);
    },
    logout: function() {
      return get("/auth/logout");
    },
    signup: function(userData) {
      return post("/auth/signup", userData);
    },
    getUserInfo: function() {
      var userId = sessionStorageHelper.getPair(vfiConstants.keyUserId);
      return get("/user/" + userId);
    }
  };
}]);

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
      debugger;
    };
  }
]);

'use strict';
var app = angular.module('vetafiApp');
app.factory('profileService', function() {
  return {
    userInfo: {}
  };
});