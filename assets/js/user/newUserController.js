angular.module('userModule')
.controller('newUserController', ['$scope', '$http','toastr','$window', function($scope, $http,toastr,$window) {
	$scope.signUpForm = {
		loading: false
	};

  $scope.status = 'viewer';

	$scope.submitSignupForm = function () {
    var file = $scope.picture;
    var uploadUrl ='/user/create';
    var fd = new FormData();
    fd.append('lastName', $scope.lastName);
    fd.append('firstName', $scope.firstName);
    fd.append('email', $scope.email);
    fd.append('pseudo', $scope.pseudo);
    fd.append('password', $scope.password);
    fd.append('status', $scope.status);
    if ($scope.lastName && $scope.firstName && $scope.email && $scope.pseudo && $scope.password && $scope.status) {
      fd.append('picture', file);
    }
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .then(function onSuccess (sailsResponse) {
      $window.sessionStorage.setItem( 'toaster', 'LogIn' );
      $window.sessionStorage.setItem( 'sailsResponse', JSON.stringify(sailsResponse ));
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {
      // Handle known error type(s)
      // If using sails-disk adapter -- Handle Duplicate key
      var emailOrPseudoAlreadyInUse = sailsResponse.status == 409;
      if (emailOrPseudoAlreadyInUse) {
        if(sailsResponse.data.errEmail){
          $scope.unavaibleEmail = $scope.email;
          $scope.errEmail = true;
          //toastr.error('Cette adresse email est déjà utilisée, choisissez-en une autre', 'Error');
        }
        if(sailsResponse.data.errPseudo){
          $scope.unavaiblePseudo = $scope.pseudo;
          $scope.errPseudo = true;
          //toastr.error('Ce pseudo est déjà utilisé, choisissez-en un autre', 'Error');
        }

      }

    })
    .finally(function eitherWay () {
      $scope.signUpForm.loading = false;
    })
	}
}])
  .directive('compareTo', function() {
    return {
      scope: {
        targetModel: '=compareTo'
      },
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {

        var compare = function() {

          var e1 = element.val();
          var e2 = scope.targetModel;

          if (e2 !== null) {
            return e1 === e2;
          }

          return false;
        };

        scope.$watch(compare, function(newValue) {
          ctrl.$setValidity('errorCompareTo', newValue);
        });

      }
    };
  })
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);
