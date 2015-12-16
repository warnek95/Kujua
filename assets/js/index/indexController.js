angular.module('indexModule')
.controller('indexController', ['$scope', '$http','toastr','$window', function($scope, $http,toastr,$window) {
    var toaster = $window.sessionStorage.getItem( 'toaster' );
    if ($window.sessionStorage.getItem( 'sailsResponse' ) != 'null') {
      var sailsResponse = JSON.parse($window.sessionStorage.getItem( 'sailsResponse' ));
    };
    if (toaster == 'LogIn' && sailsResponse != 'null') {
      toastr.success(sailsResponse.data.replace('\n','<br />'), 'Connecté', {
        allowHtml: true
      });
    } else if ( toaster == 'LogOut' ) {
      toastr.success(sailsResponse.data, 'Déconnecté');
    }
    $window.sessionStorage.clear()
}])
