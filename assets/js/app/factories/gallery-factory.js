(function(app){
	'use strict';
	app.factory('galleryFactory', ['$http', function($http){
		return{
			getAll: function(){
				return new Promise(function(resolve, reject){
					$http.get('/gallery/all')
					.then(function(resp){
						resolve(resp.data);
					});
				});
			},
			getByDisplay: function(display){
				return new Promise(function(resolve, reject){
					$http.get('/gallery/display/?display='+display)
					.then(function(resp){
						resolve(resp.data);
					});
				});
			},
			save: function(image){
				return new Promise(function(resolve, reject){
					$http.post('/gallery/save', image)
					.then(function(resp){
						resolve(resp.data);
					});
				});
			},
			upload: function(file, name, extension){
				var data = new FormData();
				data.append("image", file);

				var filename = name ? name.replace(/ /, '') : file.name.replace(/ /, '');

				return new Promise(function(resolve, reject){
					$http.post("/gallery/upload?filename="+filename+"&ext="+extension, data, {
					    headers: { 'Content-Type': undefined },
					    transformRequest: angular.identity
					}).then(function (resp) {
						resolve(resp.data);
					}, function (err) {
						reject(err);
					});
				});
			}
		};
	}]);
})(angular.module('ndnapp'));