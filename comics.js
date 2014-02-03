angular.module('Comics',['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			controler: 'MainCtrl',
			templateUrl: 'templates/character.html'
		});
	})
	.controller('MainCtrl',function($scope, ComicBooks) {
		ComicBooks.find().then(function(result) {
			$scope.characters = result.data.results;
		});
	})
	.directive('comicbook',function() {

		var linker = function(scope, element, attrs) {
			console.log(element);
		};
		var controller = function($scope, ComicBooks) {
			console.log('hey');
			$scope.getCharacterInfo = function(characterName) {
				console.log('hey');
				//On click get the character name so we can get the info from the server
				//Why you no work?
			};
		}
		return {
			restrict: 'A',
			link: linker,
			controller: controller
		};
	})
	.factory('ComicBooks',function($http,$q) {
		//For Client Side
		//Where apikey is public key
		//http://gateway.marvel.com/v1/comics/?ts=1&apikey=1234
		var publicKey = 'f1da2ae2dc487b462dc04513dea9eac1';
		var baseUrl = 'http://gateway.marvel.com/v1/';
		var find = function() {
			var def = $q.defer();
			var ts = +new Date();
			var url = baseUrl + 'public/characters?limit=50&apikey=' + publicKey;
			$http.get(url).success(def.resolve).error(def.reject);

			return def.promise;
		};

		return {
			find: find
		};
	});