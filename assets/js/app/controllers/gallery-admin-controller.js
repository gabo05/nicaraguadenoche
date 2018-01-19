(function (app) {
    'use strict';
    app.controller('galleryAdminController', ['$scope', 'galleryFactory', function ($scope, gallery) {
        $scope.image = {
            display: []
        };
        $scope.images = [];
        $scope.loadImages = function () {
            $scope.view = 1;
            gallery.getAll()
            .then(function (data) {
                $scope.images = data;
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
        $scope.save = function(){
            gallery.upload($scope.resource[0], $scope.resource[0].name, '')
            .then(function(data){
                $scope.image.gid = data.id;
                return gallery.save($scope.image);
            })
            .then(function name(data) {
                showMessage('Lugar guardado correctamente');
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