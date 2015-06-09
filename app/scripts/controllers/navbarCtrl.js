'use strict';

angular.module('mmtFinalExamApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location) {

    $scope.navbar = {
      title: 'MMT Final Exam',
      isHome: true
    };

    $rootScope.$on('$routeChangeSuccess', function() {
      $scope.navbar.isHome = ($location.path() == '/');
    });
  });
