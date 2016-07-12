function postRequest(url, data, successFunc, failFunc) {
  $.ajax({
    url: url,
    method: "POST",
    data: data,
    dataType: 'json',
    success: successFunc,
    error: failFunc
  });
}

$(document).ready(function(){
  $('.vfi-signup-view .vfi-submit-btn').click(function() {
    var email = $('.vfi-input-email').val();
    var password = $('.vfi-input-password').val();

    var url = "http://localhost:3999/auth/signup";
    var data = {};
    var success = function(resp) {
      debugger;
      window.location.replace(resp.redirect);
    };
    var error = function(resp) {
      debugger;
    };
    postRequest(url, data, success, error);
  });


  $('.vfi-login-view .vfi-submit-btn').click(function() {
    var email = $('.vfi-input-email').val();
    var password = $('.vfi-input-password').val();
    var url = "http://localhost:3999/auth/login";
    var data = {"email": email, "password": password};
    var success = function(resp) {
      debugger;
      window.location.replace(resp.redirect);
    };
    var error = function(resp) {
      debugger;
    };
    postRequest(url, data, success, error);
  });

});


  // $scope.onClickSubmit = function($event) {
  //   var progressBar = $($event.currentTarget).find('.vfi-progress');
  //   if (!_.isEmpty(progressBar)) {
  //     progressBar.animate({width: '60%'}, 700, function() {
  //       if ($scope.atSignupPage) {
  //
  //       } else if ($scope.atLoginPage) {
  //         var email = $('.vfi-input-email').val();
  //         var password = $('.vfi-input-password').val();
  //         net.login(email, password).then(function(resp) {
  //           debugger;
  //           if (resp.status == 200) {
  //             profileService.userInfo = resp.data.user;
  //             progressBar.animate({width: '100%'}, 300, function() {
  //               $location.path(resp.data.redirect);
  //               $scope.$apply();
  //             });
  //           } else {
  //             console.log('Error logging in');
  //           }
  //         });
  //
  //       }
  //     });
  //   }
  // };
