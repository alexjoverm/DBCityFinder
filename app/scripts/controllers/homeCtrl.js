'use strict';

angular.module('mmtFinalExamApp')
  .controller('HomeCtrl', function ($scope, DataSvc, RestSvc) {

    $scope.map = DataSvc.map;
    $scope.rectangle = {
      bounds: {
        sw: {
          latitude: 47.46,
          longitude: 13.07
        },
        ne: {
          latitude : 47.76,
          longitude: 13.77
        }
      },
      show: false
    };
    $scope.results = DataSvc.results;
    $scope.markers = DataSvc.markers;
    $scope.population = DataSvc.population;
    $scope.languages = DataSvc.languages;
    $scope.countries = DataSvc.countries;
    $scope.config = {
      loading: false
    };

    $scope.search = {};
    $scope.search.language = $scope.languages[0];


    /****** Functions ******/

    $scope.Search = function(){
      var params = angular.copy($scope.search);
      if($scope.rectangle.show) {
        if (params)
          params.rectangle = $scope.rectangle.bounds;
        else
          params = { rectangle: $scope.rectangle.bounds };
      }
      RestSvc.Search(params);
    };

    /****** Events ******/

    $scope.map.events = {
      click: function(map, eventName, eventData){

        if(!$scope.rectangle.show){
          // Create rectangle centered, and within the bounds of the map
          var xMin = map.getBounds().getSouthWest().lng();
          var xMax = map.getBounds().getNorthEast().lng();
          var yMin = map.getBounds().getNorthEast().lat();
          var yMax = map.getBounds().getSouthWest().lat();

          // Set the rectangle in the middle of the map
          var factor = 0.2; // 20% margin to the bounds
          $scope.rectangle.bounds.ne.latitude = yMin + ((yMax - yMin) * factor);
          $scope.rectangle.bounds.sw.latitude = yMin + ((yMax - yMin) * (1 - factor));
          $scope.rectangle.bounds.sw.longitude = xMin + ((xMax - xMin) * factor);
          $scope.rectangle.bounds.ne.longitude = xMin + ((xMax - xMin) * (1 - factor));

          $scope.rectangle.show = true;
          $scope.$apply();
        }
      }
    };

    $scope.$on('DataSvc:dataLoaded', function(){
      $scope.markers = DataSvc.markers;
      $scope.results = DataSvc.results;
    });

    $scope.$on('DataSvc:loadedCountries', function(){
      $scope.countries = DataSvc.countries;
    });

    $scope.$on('RestSvc:startLoading', function(){
      $scope.config.loading = true;
    });

    $scope.$on('RestSvc:stopLoading', function(){
      $scope.config.loading = false;
    });


  });
