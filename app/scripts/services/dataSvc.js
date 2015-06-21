'use strict';

angular.module('mmtFinalExamApp')
  .factory('DataSvc', function ($rootScope, $http) {

    /*********  PRIVATE API  *********/

    // Static data

    var _population = [
      {
        text: '0 - 1,000',
        min: 0,
        max: 1000
      },
      {
        text: '1,000 - 10,000',
        min: 1000,
        max: 10000
      },
      {
        text: '10,000 - 100,000',
        min: 10000,
        max: 100000
      },
      {
        text: '100,000 - 1,000,000',
        min: 100000,
        max: 1000000
      },
      {
        text: '> 1,000,000',
        min: 1000000,
        max: 10000000000
      }
    ];

    var _languages = [
      {
        text: 'English',
        code: 'EN'
      },
      {
        text: 'Español',
        code: 'ES'
      },
      {
        text: 'Deutch',
        code: 'DE'
      }
    ];

    $http.get('scripts/static/countries.json').success(function(data, status, headers, config) {
      self.countries = data;
      $rootScope.$broadcast('DataSvc:loadedCountries');
    }).error(function(data, status, headers, config) {
      console.log(data);
    });


    // Functions

    var createMarker = function(lat, lng, title){
      return {
        id: self.markers.length,
        latitude: lat,
        longitude: lng,
        title: title,
        show: false,
        onClick: function() { this.show = !this.show; }
      }
    };







    /***********  PUBLIC API  ***********/

    var self = {
      population: _population,
      languages: _languages,
      countries: [],
      results: [],
      markers: [],
      resultsDetail: [],
      markersDetail: [],
      map: {
        center: {latitude: 47.76, longitude: 13.07 },
        zoom: 9
      },

      InsertData: function(data){
        self.results = data.results.bindings;
        self.markers = [];
        for(var i in self.results)
          self.markers.push(
            createMarker(+self.results[i].latitude.value, +self.results[i].longitude.value, self.results[i].name.value)
          );

        $rootScope.$broadcast('DataSvc:dataLoaded');
      },

      InsertDetail: function(data){
        console.log(data);
        self.resultsDetail = data.results.bindings;
        for(var i in self.resultsDetail)
          self.markersDetail.push(
            createMarker(+self.results[i].latitude.value, +self.results[i].longitude.value, self.results[i].name.value)
          );

        $rootScope.$broadcast('DataSvc:detailLoaded');
      },
      ResetDetailVars: function(){
        self.resultsDetail = [];
        self.markersDetail = [];
      }
    };

    return self;
  });
