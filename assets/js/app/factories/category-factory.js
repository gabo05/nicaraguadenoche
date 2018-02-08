(function(app){
	'use strict';
	app.factory('categoryFactory', ['$http', function($http){
		return{
			getAll: function(){
				return new Promise(function(resolve, reject){
					$http.get('/category/all')
					.then(function(resp){
						resolve(resp.data);
					});
				});
			},
			getByType: function(display){
				return new Promise(function(resolve, reject){
					$http.get('/category/type/?type='+display)
					.then(function(resp){
						resolve(resp.data);
					});
				});
			},
			save: function(image){
				return new Promise(function(resolve, reject){
					$http.post('/category/save', image)
					.then(function(resp){
						resolve(resp.data);
					});
				});
			}
		};
	}]);
})(angular.module('ndnapp'));