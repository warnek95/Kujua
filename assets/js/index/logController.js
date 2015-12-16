angular.module('indexModule')
  .controller('logController', ['$scope','$window','$http', function($scope,$window,$http) {

    $scope.submitLogInForm = function () {
      $http.post('/session/create', {
        email: $scope.email,
        password: $scope.password,
        _csrf: $scope._csrf
      })
        .then(function onSuccess (sailsResponse) {
          var logInSuccessful = sailsResponse.status == 209;
          if (logInSuccessful) {

            $window.sessionStorage.setItem( 'toaster', 'LogIn' );
            $window.sessionStorage.setItem( 'sailsResponse', JSON.stringify(sailsResponse ));
            window.location = '/';
          };
        })
        .catch(function onError(sailsResponse) {
          // Handle known error type(s)
          // If using sails-disk adapter -- Handle Duplicate key
          var emailOrPasswordInvalid = sailsResponse.status == 410;
          if (emailOrPasswordInvalid) {
            toastr.error(sailsResponse.data, 'Erreur');
            return;
          };
        })
        .finally(function eitherWay (argument) {
          $scope.logInForm.loading = false;
        })
    }

    $scope.submitLogOutForm = function () {
      $http.post('/session/destroy', {
        _csrf: $scope._csrf
      })
        .then(function onSuccess (sailsResponse) {
          $window.sessionStorage.setItem( 'toaster', 'LogOut' );
          $window.sessionStorage.setItem( 'sailsResponse', JSON.stringify(sailsResponse ));
          var logInSuccessful = sailsResponse.status == 210;
          window.location = "/";
        })
        .catch(function onError(sailsResponse) {
          // Handle known error type(s)
          // If using sails-disk adapter -- Handle Duplicate key
        })
        .finally(function eitherWay (argument) {
          $scope.logInForm.loading = false;
        })
    }
  }]);
