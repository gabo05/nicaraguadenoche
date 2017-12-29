(function(app){
	'use strict';
	app.controller('articleAdminController', ['$scope', 'articleFactory', function($scope, artFact){
		$scope.article = {
			tags: []
		};
		$scope.articles = [];
		$scope.view = 1;
		var showMessage = function(message){
			$scope.message = message;
				$('#message').fadeIn();
				setTimeout(function(){
					$('#message').fadeOut();
				}, 3000);
		};
		$scope.loadArticles = function(){
			artFact.getAll()
			.then(function(data){
				$scope.articles = data;
				$scope.$apply();
			}).catch(function(error){
				cosole.error(error);
			});
		};
		$scope.loadArticles();
		$scope.newart = function(){
			$scope.article = {
				tags: []
			};
			$scope.view = 2;
		};
		$scope.edit = function(art){
			$scope.article = art;
			$scope.view = 2;
		};
		$scope.pubUnpub = function(art){
			art.published = !place.published;
			artFact.actDeact(art.id, art.published);
		};
		$scope.save = function(){
			artFact.save($scope.article).then(function(data){
				showMessage('Articulo guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				artFact.uploadImage(mainimage, data.path +'.'+ mainimage.name.split('.')[1]);
				document.getElementById('imgpreview').src = '/images/preview.png';
				document.getElementById('image').value='';
				$scope.article = {
					tags: []
				};
				$scope.loadArticles();
			}).catch(function(err){
				showMessage('Hubo un problema al guardar el artículo');
			});
		};
		$scope.add = function(){
			if($scope.article.tags.indexOf($scope.selected) < 0)
				$scope.article.tags.push($scope.selected);
			$scope.selected = '';
		};
		$scope.imageUpload = function(files) {
		    /*console.log('image upload:', files);
		    console.log('image upload\'s editable:', $scope.editable);*/
		    var filesArr = Array.prototype.slice.call(files);

		    filesArr.forEach(function(file){
		    	artFact.uploadImage(file)
		    	.then(function(data){
					$scope.editor.summernote('editor.insertImage', '/uploads/images/blog/'+file.name);
		    	}).catch(function(err){
		    		console.error(err);
		    	});
		    });
		};
	}]);
})(angular.module('ndnapp'))