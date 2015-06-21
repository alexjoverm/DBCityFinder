'use strict';

angular.module('mmtFinalExamApp')
  .controller('DetailCtrl', function ($scope, $routeParams, DataSvc) {

    $scope.results = DataSvc.resultsDetail;
    $scope.markers = DataSvc.markersDetail;

    $scope.map = angular.copy(DataSvc.map);
    if($scope.markers.length){
      $scope.map.center.latitude = $scope.markers[0].latitude;
      $scope.map.center.longitude = $scope.markers[0].longitude;
    }



  });
