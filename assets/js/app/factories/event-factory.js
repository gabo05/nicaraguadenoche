(function(app){
	'use strict';
	app.factory('eventFactory', ['$http', function($http){
		return{
			getCommingSoon: function(info){
				return new Promise(function(resolve, reject){
					$http.get('/event/comingsoon')
					.then(function(resp){
						resolve(resp.data);
					}, function(err){
						reject(err);
					})
				});
			}
		};
	}]);
})(angular.module('ndnapp'));