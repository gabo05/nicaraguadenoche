(function(app){
	'use strict';
	app.controller('eventAdminController', ['$scope', 'eventFactory', function($scope, eventFact){
		$scope.event = {
			location: {

			}
		};
		$scope.events = [];
		$scope.view = 1;
		var showMessage = function(message){
			$scope.message = message;
				$('#message').fadeIn();
				setTimeout(function(){
					$('#message').fadeOut();
				}, 3000);
		};
		$scope.loadEvents = function(){
			eventFact.getAll()
			.then(function(data){
				$scope.events = data;
				$scope.$apply();
			}).catch(function(error){
				cosole.error(error);
			});
		};
		$scope.loadEvents();
		$scope.newevent = function(){
			$scope.event = {
				location: {
					latitude: 12.125,
					longitude: -86.263
				}
			};
			$scope.center();
			$scope.showMarker();
			$scope.view = 2;
		};
		$scope.edit = function(event){
			$scope.event = event;
			$scope.start_date = event.start_date;
			$scope.end_date = event.end_date;
			$scope.view = 2;
			$scope.showMarker();
		};
		$scope.actdect = function(event){
			event.active = !event.active;
			eventFact.actDeact(event.id, event.active);
		};
		$scope.changeUrl = function () {
			var videoregex = /https:\/\/www[.]youtube[.]com\/watch[?]v=.+/;
			if(videoregex.test($scope.event.video)){
				$scope.event.video = 'https://www.youtube.com/embed/'+$scope.event.video.replace(/https:\/\/www[.]youtube[.]com\/watch[?]v=/, '');
			}
		};
		$scope.save = function(){
			$scope.event.start_date = moment($scope.start_date, 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
			$scope.event.end_date = moment($scope.end_date, 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
			var videoregex = /https:\/\/www[.]youtube[.]com\/watch[?]v=.+/;
			if(videoregex.test($scope.event.video)){
				$scope.event.video = 'https://www.youtube.com/embed/'+$scope.event.video.replace(/https:\/\/www[.]youtube[.]com\/watch[?]v=/, '');
			}
			eventFact.save($scope.event).then(function(data){
				showMessage('Evento guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				eventFact.uploadImage(mainimage, data.path , mainimage.name.split('.')[1]);
				document.getElementById('imgpreview').src = '/images/preview.png';
				document.getElementById('image').value='';
				$scope.event = {
					location: {

					},
					filters: []
				};
				$scope.loadEvents();
			}).catch(function(err){
				showMessage('Hubo un problema al guardar el evento');
			});
		};
		google.maps.event.addListener(map, 'click', function(evt){
			
			$scope.event.location.latitude = parseFloat(evt.latLng.lat().toFixed(3));
			$scope.event.location.longitude = parseFloat(evt.latLng.lng().toFixed(3));
			$scope.showMarker();
			$scope.$apply();
		});
		$scope.showMarker = function(){
			var uluru = { lat: $scope.event.location.latitude, lng: $scope.event.location.longitude };
			marker.setMap(null);
			marker = new google.maps.Marker({
				position: uluru,
				map: map
			});
		};
		$scope.center = function(){
			map.setCenter({ lat: $scope.event.location.latitude, lng: $scope.event.location.longitude });
		};
		// $scope.add = function(){
		// 	if($scope.event.filters.indexOf($scope.selected) < 0)
		// 		$scope.event.filters.push($scope.selected);
		// }
	}]);
})(angular.module('ndnapp'))