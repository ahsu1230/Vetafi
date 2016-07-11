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
    }).when("/page-not-found", {
        templateUrl: "templates/pageNotFound.html"
    }).when("/faq", {
        templateUrl: "templates/faq.html"
    }).when("/signup", {
        templateUrl: "templates/signin.html"
    }).when("/login", {
        templateUrl: "templates/signin.html"
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
app.controller("headerCtrl", ['$scope', 'profileService',
	function ($scope, profileService) {
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
    }
  };
}]);

var app = angular.module('vetafiApp');
app.controller('profileCtrl', ['$scope', 'profileService',
  function($scope, profileService) {
    $scope.userInfo = {};
    $scope.claims = [];
  }
]);

'use strict';
var app = angular.module('vetafiApp');
app.factory('profileService', function() {
  return {
    userInfo: {}
  };
});

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
