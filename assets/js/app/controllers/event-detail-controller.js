(function(app){
	'use strict';
	app.controller('eventDetailController', ['$scope', 'eventFactory', function($scope, event){
		$scope.coming_events = [];
		$scope.moment = moment;
		event.getCommingSoon()
		.then(function(data){
			$scope.coming_events = data.slice(2);
			$scope.$apply();
		})
		.catch(function(err){

		});
	}]);
})(angular.module('ndnapp'));