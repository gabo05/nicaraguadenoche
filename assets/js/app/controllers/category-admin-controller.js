(function (app) {
    'use strict';
    app.controller('cateogoryAdminController', ['$scope', 'categoryFactory', function ($scope, categoryF) {
        $scope.category = {
            display: []
        };
        $scope.categories = [];
        $scope.loadCategories = function () {
            $scope.view = 1;
            categoryF.getAll()
            .then(function (data) {
                $scope.categories = data;
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
            $scope.category.keyname = $scope.category.name.replace(/ /, '_').toLowerCase();
            categoryF.save($scope.category)
            .then(function name(data) {
                showMessage('Categoria guardado correctamente');
                $scope.loadCategories();
            });
        };
        $scope.newcategory = function () {
            $scope.category = {
                display: []
            };
            $scope.view = 2;
        };
        $scope.edit = function (gimg) {
            $scope.category = gimg;
            $scope.view = 2;
        };
        $scope.loadCategories();
    }]);
})(angular.module('ndnapp'));