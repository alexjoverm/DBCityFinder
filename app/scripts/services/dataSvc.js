'use strict';

angular.module('mmtFinalExamApp')
  .factory('DataSvc', function ($rootScope) {

    /*********  PRIVATE API  *********/

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
      results: [],
      markers: [],
      map: {
        center: {latitude: 47.76, longitude: 13.07 },
        zoom: 10
      },

      InsertData: function(data){

        // FAKE!!!!
        self.markers.push( createMarker(47.716143, 13.090606, 'Puch') );
        self.markers.push( createMarker(47.813840, 13.053755, 'Salzburg') );

        $rootScope.$broadcast('DataSvc:dataLoaded');
      }
    };

    return self;
  });
