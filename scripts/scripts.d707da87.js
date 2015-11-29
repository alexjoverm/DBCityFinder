"use strict";angular.module("mmtFinalExamApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","angular-loading-bar","pascalprecht.translate"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/detail",{templateUrl:"views/detail.html",controller:"DetailCtrl"}).otherwise({redirectTo:"/"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyA17dBZBZDBjsmWjo8zC2fYJFmHVrVHVTY",v:"3.17",libraries:"geometry,visualization"})}]),angular.module("mmtFinalExamApp").controller("HomeCtrl",["$scope","$location","$translate","$window","DataSvc","RestSvc",function(a,b,c,d,e,f){if(a.map=e.map,a.rectangle={bounds:{sw:{latitude:47.46,longitude:13.07},ne:{latitude:47.76,longitude:13.77}},show:!1},a.results=e.results,a.markers=e.markers,a.population=e.population,a.languages=e.languages,a.countries=e.countries,a.config={loading:!1},a.search=e.searchObj,a.search.language=a.languages[0],d.localStorage.__language){var g=angular.fromJson(d.localStorage.__language);for(var h in a.languages)a.languages[h].code==g.code&&(a.search.language=a.languages[h]);c.use(a.search.language.code.toLowerCase())}a.LanguageChange=function(){c.use(a.search.language.code.toLowerCase()),d.localStorage.__language=angular.toJson(a.search.language)},a.Search=function(){var b=angular.copy(a.search);a.rectangle.show&&(b?b.rectangle=a.rectangle.bounds:b={rectangle:a.rectangle.bounds}),f.Search(b)},a.GetDetail=function(b){f.Detail({id:b,language:a.search.language})},a.map.events={click:function(b,c,d){if(!a.rectangle.show){var e=b.getBounds().getSouthWest().lng(),f=b.getBounds().getNorthEast().lng(),g=b.getBounds().getNorthEast().lat(),h=b.getBounds().getSouthWest().lat(),i=.2;a.rectangle.bounds.ne.latitude=g+(h-g)*i,a.rectangle.bounds.sw.latitude=g+(h-g)*(1-i),a.rectangle.bounds.sw.longitude=e+(f-e)*i,a.rectangle.bounds.ne.longitude=e+(f-e)*(1-i),a.rectangle.show=!0,a.$apply()}}},a.sorting={reverse:!1,predicate:"",oldPredicate:""},a.order=function(b){a.sorting.oldPredicate=a.sorting.predicate,a.sorting.predicate=b,a.sorting.oldPredicate==a.sorting.predicate?a.sorting.reverse=!a.sorting.reverse:a.sorting.reverse=!1},a.$on("DataSvc:dataLoaded",function(){a.markers=e.markers,a.results=e.results}),a.$on("DataSvc:loadedCountries",function(){a.countries=e.countries}),a.$on("RestSvc:startLoading",function(){a.config.loading=!0}),a.$on("RestSvc:stopLoading",function(){a.config.loading=!1}),a.$on("DataSvc:detailLoaded",function(){console.log(e.resultsDetail),e.resultsDetail.name&&b.path("/detail")})}]),angular.module("mmtFinalExamApp").controller("DetailCtrl",["$scope","$routeParams","DataSvc",function(a,b,c){a.results=c.resultsDetail,a.markers=c.markersDetail,a.map=angular.copy(c.map),a.markers.length&&(a.map.center.latitude=a.markers[0].latitude,a.map.center.longitude=a.markers[0].longitude)}]),angular.module("mmtFinalExamApp").controller("NavbarCtrl",["$scope","$rootScope","$location",function(a,b,c){a.navbar={title:"DB City Finder",isHome:!0},b.$on("$routeChangeSuccess",function(){a.navbar.isHome="/"==c.path()})}]),angular.module("mmtFinalExamApp").factory("DataSvc",["$rootScope","$http",function(a,b){var c=[{text:"0 - 1,000",min:0,max:1e3},{text:"1,000 - 10,000",min:1e3,max:1e4},{text:"10,000 - 100,000",min:1e4,max:1e5},{text:"100,000 - 1,000,000",min:1e5,max:1e6},{text:"> 1,000,000",min:1e6,max:1e10}],d=[{text:"English",code:"EN"},{text:"Español",code:"ES"},{text:"Deutsch",code:"DE"}];b.get("scripts/static/countries.json").success(function(b,c,d,e){f.countries=b,a.$broadcast("DataSvc:loadedCountries")}).error(function(a,b,c,d){console.log(a)});var e=function(a,b,c){return{id:f.markers.length,latitude:a,longitude:b,title:c,show:!1,onClick:function(){this.show=!this.show}}},f={population:c,languages:d,countries:[],results:[],markers:[],resultsDetail:{},searchObj:{},markersDetail:[],map:{center:{latitude:47.76,longitude:13.07},zoom:9},InsertData:function(b){f.results=b.results.bindings,f.markers=[];for(var c in f.results)f.results[c].population.value=parseInt(f.results[c].population.value),f.markers.push(e(+f.results[c].latitude.value,+f.results[c].longitude.value,f.results[c].name.value));a.$broadcast("DataSvc:dataLoaded")},InsertDetail:function(b){if(console.log(b),b.results.bindings&&b.results.bindings.length){f.resultsDetail=b.results.bindings[0],f.resultsDetail.latitude&&f.resultsDetail.longitude&&f.markersDetail.push(e(+f.resultsDetail.latitude.value,+f.resultsDetail.longitude.value,f.resultsDetail.name.value));var c=[];for(var d in b.results.bindings)b.results.bindings[d].links&&c.push(b.results.bindings[d].links.value);f.resultsDetail.links=c}a.$broadcast("DataSvc:detailLoaded")},ResetDetailVars:function(){f.resultsDetail={},f.markersDetail=[]}};return f}]),angular.module("mmtFinalExamApp").factory("RestSvc",["$http","$rootScope","DataSvc",function(a,b,c){function d(a){var b="";for(var c in a)if(a.hasOwnProperty(c))if("city"==c&&""!=a[c].trim())b+=j.replace("__-__",a[c].trim());else if("population"==c&&a[c]){var d=i.replace("__-__",a[c].min);b+=d.replace("--_--",a[c].max)}else"country"==c&&a[c]?b+=h.replace("__-__",a[c].name):"rectangle"==c&&(b+=k.replace("__-__1",a[c].ne.latitude),b=b.replace("__-__2",a[c].sw.latitude),b=b.replace("__-__3",a[c].ne.longitude),b=b.replace("__-__4",a[c].sw.longitude));return b}function e(a){var b=l.replace("__id",a.id);return b=b.replace(new RegExp("__language","g"),a.language.code)}var f="SELECT DISTINCT * WHERE { ?city rdf:type dbo:Settlement; dbo:wikiPageID ?id; rdfs:label ?name; dbo:abstract ?abstract; dbo:populationTotal ?population; dbo:country ?country; geo:lat ?latitude; geo:long ?longitude. ?country rdfs:label ?country_name. ",g='FILTER langMatches(lang(?abstract), "__language"). FILTER langMatches(lang(?country_name), "__language"). FILTER langMatches(lang(?name), "__language")} LIMIT 200',h='?country rdfs:label "__-__"@en . ',i="FILTER ( ?population > __-__ and ?population < --_-- ). ",j='FILTER regex(?name, "__-__", "i"). ',k="FILTER ( ?latitude < __-__1 and ?latitude > __-__2 and ?longitude < __-__3 and ?longitude > __-__4  ). ",l='SELECT * WHERE { ?city rdf:type dbo:Settlement; dbo:wikiPageID ?id; rdfs:label ?name; dbo:abstract ?abstract; dbo:populationTotal ?population; dbo:country ?country; geo:lat ?latitude; geo:long ?longitude. OPTIONAL { ?city dbo:thumbnail ?image }. OPTIONAL { ?city dbo:wikiPageExternalLink ?links }. OPTIONAL { ?city dbo:postalCode ?postal_code }. OPTIONAL { ?city dbo:elevation ?elevation }. OPTIONAL { ?city dbo:district ?district. ?district rdfs:label ?district_name. FILTER langMatches(lang(?district_name), "__language") }. OPTIONAL { ?city dbo:areaTotal ?area }. ?country rdfs:label ?country_name. FILTER (?id = __id). FILTER langMatches(lang(?abstract), "__language"). FILTER langMatches(lang(?name), "__language"). FILTER langMatches(lang(?country_name), "__language"). }',m={headers:{"Content-type":"application/x-www-form-urlencoded",Accept:"application/sparql-results+json"},params:{query:null,formal:"json"}},n=!1,o={};return o.Search=function(e){if(!n){n=!0;var h=d(e),i=f+h+g;i=i.replace(new RegExp("__language","g"),e.language.code),m.params.query=i,b.$broadcast("RestSvc:startLoading"),console.log(i),a.get("http://dbpedia.org/sparql",m).success(function(a){c.InsertData(a),console.log(arguments),n=!1,b.$broadcast("RestSvc:stopLoading")}).error(function(){console.log(arguments),n=!1,b.$broadcast("RestSvc:stopLoading")})}},o.Detail=function(d){if(!n){c.ResetDetailVars(),n=!0;var f=e(d);m.params.query=f,b.$broadcast("RestSvc:startLoading"),console.log(f),a.get("http://dbpedia.org/sparql",m).success(function(a){c.InsertDetail(a),n=!1,b.$broadcast("RestSvc:stopLoading")}).error(function(){console.log(arguments),n=!1,b.$broadcast("RestSvc:stopLoading")})}},o}]),angular.module("mmtFinalExamApp").config(["$translateProvider",function(a){a.translations("en",{CITY:"City",POPULATION:"Population",COUNTRY:"Country",TEXT_MAP:"Click on the map to create a limited rectangle area of results",REMOVE_RECTANGLE:"Remove rectangle",SEARCH:"Search",HOME:"Home",PEOPLE:"People",POSTAL_CODE:"Postal code",AREA:"Area",COORDINATES:"Coordinates",ELEVATION:"Elevation",LINKS:"Links",ADDITIONAL_INFO:"Additional info",DISTRICT:"District"}),a.translations("de",{CITY:"Stadt",POPULATION:"Bevölkerung",COUNTRY:"Land",TEXT_MAP:"Klicke auf die Karte um einen rechteckigen Filter zu setzen",REMOVE_RECTANGLE:"Rechteckigen Filter entfernen",SEARCH:"Suche",HOME:"Home",PEOPLE:"Einwohner",POSTAL_CODE:"Postleitzahl",AREA:"Gebiet",COORDINATES:"Koordinaten",ELEVATION:"Höhengrad",LINKS:"Links",ADDITIONAL_INFO:"Zusätzliche Informationen",DISTRICT:"Kreis"}),a.translations("es",{CITY:"Ciudad",POPULATION:"Población",COUNTRY:"País",TEXT_MAP:"Haz click en el mapa para crear un área de limitación rectangular",REMOVE_RECTANGLE:"Eliminar rectángulo",SEARCH:"Buscar",HOME:"Inicio",PEOPLE:"Personas",POSTAL_CODE:"Código postal",AREA:"Área",COORDINATES:"Coordenadas",ELEVATION:"Elevación",LINKS:"Enlaces",ADDITIONAL_INFO:"Información adicional",DISTRICT:"Distrito"}),a.preferredLanguage("en")}]);