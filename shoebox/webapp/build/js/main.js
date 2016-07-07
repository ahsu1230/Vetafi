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

var app = angular.module('vetafiApp');
app.controller('faqCtrl', ['$scope', function($scope) {

}]);

'use strict';
var app = angular.module('vetafiApp');
app.controller("headerCtrl", ['$scope', function ($scope) {
	$scope.links = [
		{
			title: 'Health Resources',
			href: '/#/faq'
		},
		{
			title: 'Profile',
			href: '/#/profile'
		},
		{
			title: 'Sign in',
			href: '/#/signin'
		}
	];
}]);

var app = angular.module('vetafiApp');
app.controller('homeCtrl', ['$scope', function($scope) {
  $scope.links = [
    {
        title:'View Health Resources',
        url:'faq'
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

'use strict';
var app = angular.module('vetafiApp');
app.factory('net', ['$http', function(http) {
  var baseUrl = "http://localhost:3999";

  var get = function (url, data) {
    return $http({
      url: baseUrl + url,
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
  };

  var post = function() {
    return $http({
      url: baseUrl + url,
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return {
    login: function (email, password) {
      var data = {
        email: email,
        password: password
      };
      return post("/login", data);
    },
    logout: function() {
      return get("/logout");
    },
    signup: function(userData) {
      return post("/signup", userData);
    }
  };
}]);

var app = angular.module('vetafiApp');
app.controller('profileCtrl', ['$scope', function($scope) {

}]);

'use strict';
var app = angular.module('vetafiApp');
app.factory('profileService', function() {
  return {
    isLoggedIn: function() {
      return false;
    },
    getUserInfo: function() {
      return {};
    }
  };
});

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
