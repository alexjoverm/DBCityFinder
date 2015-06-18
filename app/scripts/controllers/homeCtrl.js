'use strict';

angular.module('mmtFinalExamApp')
  .controller('HomeCtrl', function ($scope, DataSvc, RestSvc) {

    $scope.map = DataSvc.map;
    $scope.results = DataSvc.results;
    $scope.markers = DataSvc.markers;
    $scope.population = DataSvc.population;
    $scope.countries = DataSvc.countries;
    $scope.config = {
      loading: false
    };


    /****** Functions ******/

    $scope.Search = function(){
      RestSvc.Search($scope.search);
    };

    /****** Events ******/

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
