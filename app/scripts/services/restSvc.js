'use strict';

angular.module('mmtFinalExamApp')
  .factory('RestSvc', function ($http, $rootScope, DataSvc) {

    // ===== Private =====
    var searchQueryIni = 'SELECT DISTINCT * WHERE { ?city rdf:type dbpedia-owl:Settlement; rdfs:label ?name; dbpedia-owl:abstract ?abstract; dbpedia-owl:populationTotal ?population; dbpedia-owl:country ?country; geo:lat ?latitude; geo:long ?longitude. ?country rdfs:label ?country_name. ';
    var searchQueryFin = 'FILTER langMatches(lang(?abstract), "EN"). FILTER langMatches(lang(?country_name), "EN"). FILTER langMatches(lang(?name), "EN")} LIMIT 200';

    var filterCountry = '?country rdfs:label "__-__"@en. ';
    var filterPopulation = 'FILTER ( ?population > __-__ and ?population < --_--). ';
    var filterCity = 'FILTER regex(?name, "__-__", "i"). ';

    var requestConfig = {
      headers:  {
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json'
      },
      params: {
        'query': null,
        'formal': 'json'
      }
    };

    var loading = false;


    function BuildFilter(params){

      var filter = '';

      for (var property in params)
        if (params.hasOwnProperty(property)) {
          if(property == 'city' && params[property].trim() != "")
            filter += filterCity.replace('__-__', params[property].trim());
          else if (property == 'population' && params[property]){
            var aux = filterPopulation.replace('__-__', params[property].min);
            filter += aux.replace('--_--', params[property].max);
          }
          else if (property == 'country' && params[property])
            filter += filterCountry.replace('__-__', params[property].name);
        }

      return filter;
    }




    // ===== Public API =====
    var api = {};

    api.Search = function(params){
      if(!loading) {
        var filter = BuildFilter(params);
        var query = searchQueryIni + filter + searchQueryFin;
        requestConfig.params.query = query;

        // Show loading
        loading = true;
        $rootScope.$broadcast('RestSvc:startLoading');

        $http.get("http://dbpedia.org/sparql", requestConfig).success(function (data) {
          console.log(data);
          DataSvc.InsertData(data);
          loading = false;
          $rootScope.$broadcast('RestSvc:stopLoading');
        }).error(function () {
          console.log(arguments);
          // Hide loading
          loading = false;
          $rootScope.$broadcast('RestSvc:stopLoading');
        });
      }
    };

    return api;
  });
