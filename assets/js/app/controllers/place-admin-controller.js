(function(app){
	'use strict';
	app.controller('placeAdminController', ['$scope', 'placeFactory', function($scope, placeFact){
		$scope.place = {
			location: {

			},
			filters: []
		};
		$scope.places = [];
		$scope.view = 1;
		var showMessage = function(message){
			$scope.message = message;
				$('#message').fadeIn();
				setTimeout(function(){
					$('#message').fadeOut();
				}, 3000);
		};
		$scope.loadPlaces = function(){
			placeFact.getAll()
			.then(function(data){
				$scope.places = data;
				$scope.$apply();
			}).catch(function(error){
				cosole.error(error);
			});
		};
		$scope.loadPlaces();
		$scope.newplace = function(){
			$scope.place = {
				location: {

				},
				filters: []
			};
			$scope.view = 2;
		};
		$scope.edit = function(place){
			$scope.place = place;
			$scope.view = 2;
		};
		$scope.actdect = function(place){
			place.active = !place.active;
			placeFact.actDeact(place.id, place.active);
		};
		$scope.save = function(){
			placeFact.save($scope.place).then(function(data){
				showMessage('Lugar guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				placeFact.uploadImage(mainimage, data.path +'.'+ mainimage.name.split('.')[1]);
				document.getElementById('imgpreview').src = '/images/preview.png';
				document.getElementById('image').value='';
				$scope.place = {
					location: {

					},
					filters: []
				};
				$scope.loadPlaces();
			}).catch(function(err){
				showMessage('Hubo un problema al guardar el lugar');
			});
		};
		$scope.add = function(){
			if($scope.place.filters.indexOf($scope.selected) < 0)
				$scope.place.filters.push($scope.selected);
		}
	}]);
})(angular.module('ndnapp'))