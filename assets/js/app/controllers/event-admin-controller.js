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

				}
			};
			$scope.view = 2;
		};
		$scope.edit = function(event){
			$scope.event = event;
			$scope.start_date = event.start_date;
			$scope.end_date = event.end_date;
			$scope.view = 2;
		};
		$scope.actdect = function(event){
			event.active = !event.active;
			eventFact.actDeact(event.id, event.active);
		};
		$scope.save = function(){
			$scope.event.start_date = moment($scope.start_date, 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
			$scope.event.end_date = moment($scope.end_date, 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
			eventFact.save($scope.event).then(function(data){
				showMessage('Evento guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				eventFact.uploadImage(mainimage, data.path +'.'+ mainimage.name.split('.')[1]);
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
		// $scope.add = function(){
		// 	if($scope.event.filters.indexOf($scope.selected) < 0)
		// 		$scope.event.filters.push($scope.selected);
		// }
	}]);
})(angular.module('ndnapp'))