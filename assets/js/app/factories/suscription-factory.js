(function(app){
	'use strict';
	app.factory('suscriptionFactory', ['$http', function($http){
		return{
			save: function(info){
				return new Promise(function(resolve, reject){
					$http.post('/suscription/save', info)
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