(function(app){
	'use strict';
	app.controller('searchController', ['$scope', function($scope){
		$scope.status = 1;
		var $logo = $('#ndnlogo');
		var $input = $('#ndnsearch');
		var $form = $('#ndnsearchform');
		$scope.searchterm = '';
		$scope.search = function(){

		};
		$scope.searchAction = function(){
			if($scope.status === 1){
				$scope.status = 2;
				$logo.addClass('searching');
			}else{
				$scope.search();
			}
		};
		$logo.click(function(){
			$scope.status = 1;
			$form.removeClass('open');
			$logo.removeClass('searching');
		});
	}]);
})(angular.module('ndnapp'));