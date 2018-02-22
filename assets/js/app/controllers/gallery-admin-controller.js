(function (app) {
    'use strict';
    app.controller('galleryAdminController', ['$scope', 'galleryFactory', 'categoryFactory', 'placeFactory', function ($scope, gallery, category, place) {
        $scope.image = {
            display: []
        };
        $scope.images = [];
        $scope.places = [];
        $scope.loadImages = function () {
            $scope.view = 1;
            gallery.getAll()
            .then(function (data) {
                $scope.images = data;
                return category.getByType('gallery');
            }).then(function (data) {
                $scope.categories = data;
                return place.getAll();
            }).then(function (data) {
                $scope.places = data;
                $scope.$apply();
            });
        };
        var showMessage = function(message){
			$scope.message = message;
				$('#message').fadeIn();
				setTimeout(function(){
					$('#message').fadeOut();
				}, 3000);
        };
        $scope.delete = function (id) {
            gallery.delete(id).then(function (data) {
                showMessage('Recurso eliminado correctamente de la galeria');
                $scope.loadImages();
            });
        };
        $scope.save = function(){
            if($scope.image.type=='video'){
                var videoregex = /https:\/\/www[.]youtube[.]com\/watch[?]v=.+/;
                if(videoregex.test($scope.image.video)){
                    $scope.image.video = $scope.image.video.replace(/https:\/\/www[.]youtube[.]com\/watch[?]v=/, '');
                }
            }
            if($scope.resource && $scope.image.type=='img')
                gallery.upload($scope.resource[0], $scope.resource[0].name, '')
                .then(function(data){
                    $scope.image.gid = data.id;
                    return gallery.save($scope.image);
                })
                .then(function name(data) {
                    showMessage('Item de galeria guardado correctamente');
                    $scope.loadImages();
                });
            else
                gallery.save($scope.image).then(function name(data) {
                    showMessage('Item de galeria guardado correctamente');
                    $scope.loadImages();
                });
        };
        $scope.newimage = function () {
            $scope.image = {
                display: []
            };
            $scope.view = 2;
        };
        $scope.edit = function (gimg) {
            $scope.image = gimg;
            $scope.view = 2;
        };
        $scope.addDisplay = function () {
            $scope.image.display.push($scope.selected);
        };
        $scope.removeDisplay = function (display) {
            $scope.images.display = $scope.images.display.filter(function (item) {
                return item !== display;
            });
        }
        $scope.loadImages();
    }]);
})(angular.module('ndnapp'));