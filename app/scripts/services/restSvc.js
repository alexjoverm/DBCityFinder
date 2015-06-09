'use strict';

angular.module('mmtFinalExamApp')
  .factory('RestSvc', function () {


    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
