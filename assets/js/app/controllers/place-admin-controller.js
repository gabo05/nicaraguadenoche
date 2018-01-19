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
					latitude: 12.125,
					longitude: -86.263
				},
				filters: []
			};
			$scope.view = 2;
			$scope.showMarker();
			$scope.center();
		};
		$scope.edit = function(place){
			$scope.place = place;
			$scope.view = 2;
			$scope.showMarker();
			$scope.center();
		};
		$scope.actdect = function(place){
			place.active = !place.active;
			placeFact.actDeact(place.id, place.active);
		};
		google.maps.event.addListener(map, 'click', function(evt){
			
			$scope.place.location.latitude = parseFloat(evt.latLng.lat().toFixed(3));
			$scope.place.location.longitude = parseFloat(evt.latLng.lng().toFixed(3));
			$scope.showMarker();
			$scope.$apply();
		});
		$scope.changeUrl = function () {
			var videoregex = /https:\/\/www[.]youtube[.]com\/watch[?]v=.+/;
			if(videoregex.test($scope.place.video)){
				$scope.place.video = 'https://www.youtube.com/embed/'+$scope.place.video.replace(/https:\/\/www[.]youtube[.]com\/watch[?]v=/, '');
			}
		};
		$scope.showMarker = function(){
			var uluru = { lat: $scope.place.location.latitude, lng: $scope.place.location.longitude };
			marker.setMap(null);
			marker = new google.maps.Marker({
				position: uluru,
				map: map
			});
		};
		$scope.center = function(){
			map.setCenter({ lat: $scope.place.location.latitude, lng: $scope.place.location.longitude });
		};
		$scope.save = function(){
			var videoregex = /https:\/\/www[.]youtube[.]com\/watch[?]v=.+/;
			if(videoregex.test($scope.place.video)){
				$scope.place.video = 'https://www.youtube.com/embed/'+$scope.place.video.replace(/https:\/\/www[.]youtube[.]com\/watch[?]v=/, '');
			}
			placeFact.save($scope.place).then(function(data){
				showMessage('Lugar guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				placeFact.uploadImage(mainimage, data.path, mainimage.name.split('.')[1]);
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
		$scope.remove = function (filter) {
			$scope.place.filters = $scope.place.filters.filter(function (f) {
				return f != filter;
			});
		};
	}]);
})(angular.module('ndnapp'))