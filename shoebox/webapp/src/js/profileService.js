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
