var app = angular.module("app", ['ngRoute'])

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views/home2.html',
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

 app.controller('commentsContoller',function($scope) {
		$scope.comments=
            [
            {text:''},          
		];

		$scope.addComment = function () {  
			
                    $scope.comments.push(
				{
					text: $scope.newComment,
				}
			)
            $scope.newComment= '';   
		}
	});

  app.directive('camera', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            elm.on('click', function() {
                navigator.camera.getPicture(
                    function(imageURI) {
                        scope.$apply(function() {
                            ctrl.$setViewValue(imageURI);
                        });
                    },
                    function(err) {
                        ctrl.$setValidity('error', false);
                    }, {quality: 50, 
                        destinationType: Camera.DestinationType.FILE_URI});
            });
        }
    };
});

    app.controller('MyCtrl1', function($scope) {
            $scope.myPictures = [];
            $scope.$watch('myPicture', function(value) {
                if (value) {
                    $scope.myPictures.push(value);
                }
            }, true);
        });




















   /* app.controller("cameraController", function($scope) {
    $scope.takePic = function() {
         
      
        navigator.camera.getPicture( onSuccess, onFail, {
            quality: 50, 
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
    }
            var onSuccess = function(imageData) {
                $scope.picData = "data:image/jpeg;base64," +imageData;
                $scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    };
});

   /* from https://github.com/hollyschinsky/MyAngularPhoneGapProject/blob/master/www/js/controllers.js */



    




