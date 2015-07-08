'use strict';

angular
  .module('mmtFinalExamApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      CITY: 'City',
      POPULATION: 'Population',
      COUNTRY: 'Country',
      TEXT_MAP: 'Click on the map to create a limited rectangle area of results',
      REMOVE_RECTANGLE: 'Remove rectangle',
      SEARCH: 'Search',
      HOME: 'Home',
      PEOPLE: 'People',
      POSTAL_CODE: 'Postal code',
      AREA: 'Area',
      COORDINATES: 'Coordinates',
      ELEVATION: 'Elevation',
      LINKS: 'Links',
      ADDITIONAL_INFO: 'Additional info',
      DISTRICT: 'District'
    });
    $translateProvider.translations('de', {
      CITY: 'Stadt',
      POPULATION: 'Bevölkerung',
      COUNTRY: 'Land',
      TEXT_MAP: 'Klicke auf die Karte um einen rechteckigen Filter zu setzen',
      REMOVE_RECTANGLE: 'Rechteckigen Filter entfernen',
      SEARCH: 'Suche',
      HOME: 'Home',
      PEOPLE: 'Einwohner',
      POSTAL_CODE: 'Postleitzahl',
      AREA: 'Gebiet',
      COORDINATES: 'Koordinaten',
      ELEVATION: 'Höhengrad',
      LINKS: 'Links',
      ADDITIONAL_INFO: 'Zusätzliche Informationen',
      DISTRICT: 'Kreis'
    });
    $translateProvider.translations('es', {
      CITY: 'Ciudad',
      POPULATION: 'Población',
      COUNTRY: 'País',
      TEXT_MAP: 'Haz click en el mapa para crear un área de limitación rectangular',
      REMOVE_RECTANGLE: 'Eliminar rectángulo',
      SEARCH: 'Buscar',
      HOME: 'Inicio',
      PEOPLE: 'Personas',
      POSTAL_CODE: 'Código postal',
      AREA: 'Área',
      COORDINATES: 'Coordenadas',
      ELEVATION: 'Elevación',
      LINKS: 'Enlaces',
      ADDITIONAL_INFO: 'Información adicional',
      DISTRICT: 'Distrito'
    });

    $translateProvider.preferredLanguage('en');
  });
