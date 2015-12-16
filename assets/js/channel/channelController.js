angular.module('channelModule')
  .controller('channelController', ['$scope', '$http','toastr','$window', function($scope, $http,toastr,$window) {

    $scope.free = "free";

    $scope.public = "public";

    $scope.category = "Voyages";

    $scope.submitChannelForm = function () {
      var file = $scope.picture;
      var uploadUrl ='/channel/create';
      var fd = new FormData();
      fd.append('name', $scope.name);
      fd.append('description', $scope.description);
      fd.append('category', $scope.category);
      fd.append('free', $scope.free);
      fd.append('public', $scope.public);
      if ($scope.name && $scope.description && $scope.category && $scope.free && $scope.public) {
        fd.append('picture', file);
      }
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success (function onSuccess(){
          window.location = '/';
        })
        .error(function onError(sailsResponse){
          // Handle known error type(s)
          // If using sails-disk adapter -- Handle Duplicate key

        })
        .finally(function eitherWay () {
        })
      //$http.post('/channel/create', {
      //  name: $scope.name,
      //  description: $scope.description,
      //  category: $scope.category,
      //  free: $scope.free,
      //  public: $scope.public
      //})
      //.then(function onSuccess (sailsResponse) {
      //  window.location = '/';
      //})
      //.catch(function onError(sailsResponse) {
      //  // Handle known error type(s)
      //  // If using sails-disk adapter -- Handle Duplicate key
      //
      //})
      //.finally(function eitherWay () {
      //})
    }

  }])
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
