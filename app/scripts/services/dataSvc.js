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
      countries: [],
      results: [],
      markers: [],
      map: {
        center: {latitude: 47.76, longitude: 13.07 },
        zoom: 9
      },

      InsertData: function(data){

        // FAKE!!!!
        self.markers = [];
        self.markers.push( createMarker(47.716143, 13.090606, 'Puch') );
        self.markers.push( createMarker(47.813840, 13.053755, 'Salzburg') );

        $rootScope.$broadcast('DataSvc:dataLoaded');
      }
    };

    return self;
  });
