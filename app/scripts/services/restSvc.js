'use strict';

angular.module('mmtFinalExamApp')
  .factory('RestSvc', function ($http, $rootScope, $location, DataSvc) {

    // ===== Private =====
    var searchQueryIni = 'SELECT DISTINCT * WHERE { ?city rdf:type dbpedia-owl:Settlement; dbpedia-owl:wikiPageID ?id; rdfs:label ?name; dbpedia-owl:abstract ?abstract; dbpedia-owl:populationTotal ?population; dbpedia-owl:country ?country; geo:lat ?latitude; geo:long ?longitude. ?country rdfs:label ?country_name. ';
    var searchQueryFin = 'FILTER langMatches(lang(?abstract), "__language"). FILTER langMatches(lang(?country_name), "__language"). FILTER langMatches(lang(?name), "__language")} LIMIT 200';

    var filterCountry = '?country rdfs:label "__-__"@__lowerLanguage . ';
    var filterPopulation = 'FILTER ( ?population > __-__ and ?population < --_-- ). ';
    var filterCity = 'FILTER regex(?name, "__-__", "i"). ';
    var filterRectangle = 'FILTER ( ?latitude < __-__1 and ?latitude > __-__2 and ?longitude < __-__3 and ?longitude > __-__4  ). ';


    // Detail query
    var detailQuery = 'SELECT * WHERE { ?city rdf:type dbpedia-owl:Settlement; dbpedia-owl:wikiPageID ?id; rdfs:label ?name; dbpedia-owl:abstract ?abstract; dbpedia-owl:populationTotal ?population; dbpedia-owl:areaTotal ?area; dbpedia-owl:thumbnail ?image; dbpedia-owl:wikiPageExternalLink ?links; dbpedia-owl:country ?country; dbpedia-owl:postalCode ?postal_code; dbpedia-owl:elevation ?elevation; dbpedia-owl:district ?district; geo:lat ?latitude; geo:long ?longitude. ?country rdfs:label ?country_name. ?district rdfs:label ?district_name. FILTER (?id = __id). FILTER langMatches(lang(?abstract), "__language"). FILTER langMatches(lang(?name), "__language"). FILTER langMatches(lang(?country_name), "__language"). FILTER langMatches(lang(?district_name), "__language"). }';


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
          else if (property == 'rectangle'){
            filter += filterRectangle.replace('__-__1', params[property].ne.latitude);
            filter = filter.replace('__-__2', params[property].sw.latitude);
            filter = filter.replace('__-__3', params[property].ne.longitude);
            filter = filter.replace('__-__4', params[property].sw.longitude);
            console.log (filter);
          }
        }

      return filter;
    }

    function PrepareDetail(params){
      var query = detailQuery.replace('__id', params.id);
      query = query.replace(new RegExp('__language', 'g'), params.language.code);
      return query;
    }




    // ===== Public API =====
    var api = {};

    api.Search = function(params){
      if(!loading) {
        loading = true;
        var filter = BuildFilter(params);
        var query = searchQueryIni + filter + searchQueryFin;

        // Set language
        console.log(query)
        console.log(params)
        query = query.replace(new RegExp('__language', 'g'), params.language.code);
        query = query.replace(new RegExp('__lowerLanguage', 'g'), params.language.code.toLowerCase());

        console.log(query)

        requestConfig.params.query = query;
        $rootScope.$broadcast('RestSvc:startLoading');

        $http.get("http://dbpedia.org/sparql", requestConfig).success(function (data) {
          DataSvc.InsertData(data);
          console.log(arguments);
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

    api.Detail = function(params){
      if(!loading) {
        DataSvc.ResetDetailVars();
        loading = true;
        var query = PrepareDetail(params);
        requestConfig.params.query = query;
        $rootScope.$broadcast('RestSvc:startLoading');

        $http.get("http://dbpedia.org/sparql", requestConfig).success(function (data) {
          DataSvc.InsertDetail(data);
          loading = false;
          $rootScope.$broadcast('RestSvc:stopLoading');
        }).error(function () {
          console.log(arguments)
          // Hide loading
          loading = false;
          $rootScope.$broadcast('RestSvc:stopLoading');
        });
      }
    };

    return api;
  });
