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
