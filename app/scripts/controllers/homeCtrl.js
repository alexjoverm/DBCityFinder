'use strict';

angular.module('mmtFinalExamApp')
  .controller('HomeCtrl', function ($scope, DataSvc) {

    $scope.map = DataSvc.map;
    $scope.markers = [];


    /****** Functions ******/

    $scope.Search = function(){

      //FAKE!!! (replace for RestSvc.Search($scope.search) )
      DataSvc.InsertData();
    };

    /****** Events ******/

    $scope.$on('DataSvc:dataLoaded', function(){
      $scope.markers = DataSvc.markers;
      $scope.results = DataSvc.results;
    });


  });
