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
			$scope.editor = grapesjs.init({
				container : '#editor',
				plugins: ['gjs-preset-newsletter'],
				pluginsOpts: {
					'gjs-preset-newsletter': {
					modalTitleImport: 'Import template',
					// ... other options
					}},
				components: '',
				style: '',
				assetManager: {
					uploadFile: function (e) {
						var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
						$scope.imageUpload(files);
					}
				}
			});
			$scope.editor.setComponents('');
		};
		$scope.edit = function(art){
			$scope.article = art;
			$scope.view = 2;
			$scope.editor = grapesjs.init({
				container : '#editor',
				plugins: ['gjs-preset-newsletter'],
				pluginsOpts: {
					'gjs-preset-newsletter': {
					modalTitleImport: 'Import template',
					// ... other options
					}},
				components: art.content,
				style: '',
				assetManager: {
					uploadFile: function (e) {
						var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
						$scope.imageUpload(files);
					}
				}
			});
		};
		$scope.pubUnpub = function(art){
			art.published = !place.published;
			artFact.actDeact(art.id, art.published);
		};
		$scope.save = function(){
			$scope.article.content = $scope.editor.getHtml();
			artFact.save($scope.article).then(function(data){
				showMessage('Articulo guardado correctamente');
				var mainimage = Array.prototype.slice.call($scope.mainimage)[0];
				if(mainimage){
					artFact.uploadImage(mainimage, data.path, mainimage.name.split('.')[1], true);
				}
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
		    	artFact.uploadImage(file, null,  file.name.split('.')[1], false)
		    	.then(function(data){
					//$scope.editor.summernote('editor.insertImage', 'https://docs.google.com/uc?id='+data.id);
					$scope.editor.AssetManager.add(['https://docs.google.com/uc?id='+data.id]);
		    	}).catch(function(err){
		    		console.error(err);
		    	});
		    });
		};
		
	}]);
})(angular.module('ndnapp'))