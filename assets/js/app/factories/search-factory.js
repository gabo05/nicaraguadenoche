(function(app){
	'use strict';
	app.factory('searchFactory', ['$http', function($http){
		return{
			search: function(answers){
				return new Promise(function(resolve, reject){
					$http.post('/search/search', { answers: answers })
					.then(function(resp){
						resolve(resp.data);
					}, function(err){
						reject(err);
					});
				});
			},
			getQuestions: function(){
				return new Promise(function(resolve, reject){
					$http.get('/search/questions')
					.then(function(resp){
						resolve(resp.data);
					}, function(err){
						reject(err);
					});
				});
			}
		};
	}]);
})(angular.module('ndnapp'));