var app = angular.module("app", ['ngRoute'])

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'cameraController'
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});

app.factory("AuthenticationService", function($location) {
  return {
    login: function(credentials) {
      if (credentials.username !== "guest" || credentials.password !== "1234") {
        alert("Username or password are incorrect - try again");
      } else {
        $location.path('/home');
      }
    }
  };
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  }
});
/* from https://github.com/hollyschinsky/MyAngularPhoneGapProject/blob/master/www/js/controllers.js */






