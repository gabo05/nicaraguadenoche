(function(app){
	'use strict';
	app.controller('searchController', ['$scope', 'searchFactory', function($scope, searchFact){
		$scope.results = [];
		$scope.settings = {};
		searchFact.getQuestions()
		.then(function(questions){
			$scope.settings.questions = questions;
			$scope.$apply();
		}).catch(function(err){
			console.error(err);
		});
		$scope.displayResults = function(answers){
			searchFact.search(answers)
			.then(function(results){
				$scope.results = results;
				$scope.$apply();
				$("html,body").animate({
	                scrollTop: $('#ndn-search-results').offset().top - 60
	            }, "slow");
			}).catch(function(err){
				console.error(err);
			});
		};
		
	}]);
})(angular.module('ndnapp'));