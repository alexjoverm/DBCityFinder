'use strict';

/**
 * @ngdoc overview
 * @name mmtFinalExamApp
 * @description
 * # mmtFinalExamApp
 *
 * Main module of the application.
 */
angular
  .module('mmtFinalExamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyA17dBZBZDBjsmWjo8zC2fYJFmHVrVHVTY',
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  });
