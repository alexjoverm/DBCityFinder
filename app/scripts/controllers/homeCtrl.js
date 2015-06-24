'use strict';

angular.module('mmtFinalExamApp')
  .controller('HomeCtrl', function ($scope, $location, $translate, $window, DataSvc, RestSvc) {

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

    $scope.search = DataSvc.searchObj;
    $scope.search.language = $scope.languages[0];

    if($window.localStorage['__language']){
      var aux = angular.fromJson($window.localStorage['__language']);
      for(var i in $scope.languages)
        if($scope.languages[i].code == aux.code)
          $scope.search.language = $scope.languages[i];

      $translate.use($scope.search.language.code.toLowerCase());
    }


    /****** Functions ******/

    $scope.LanguageChange = function(){
      $translate.use($scope.search.language.code.toLowerCase());
      $window.localStorage['__language'] = angular.toJson($scope.search.language);
    };

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

    $scope.GetDetail = function(id){
      RestSvc.Detail({id: id, language: $scope.search.language});
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


    /****** Sorting *******/
    $scope.sorting = {
      reverse: false,
      predicate: '',
      oldPredicate: ''
    };

    $scope.order = function(predicate){
      $scope.sorting.oldPredicate = $scope.sorting.predicate;
      $scope.sorting.predicate = predicate;
      if($scope.sorting.oldPredicate == $scope.sorting.predicate)
        $scope.sorting.reverse = !$scope.sorting.reverse;
      else
        $scope.sorting.reverse = false;
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

    $scope.$on('DataSvc:detailLoaded', function(){
      console.log(DataSvc.resultsDetail)
      if(DataSvc.resultsDetail.name)
        $location.path('/detail');
    });


  });
