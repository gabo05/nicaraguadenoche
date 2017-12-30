(function(app){
	'use strict';
	app.directive('search', [function(){
		return{
			restrict: 'EA',
			templateUrl: '/home/search',
			scope: {
				settings: '=',
				showResults: '&',
				returnStart: '@'
			},
			link: function(scope, element, attrs){
				scope.answers = [];
				scope.options = [];
				scope.change = function(){
					for (var i = 0; i < scope.options.length; i++) {
						scope.options.pop();
					}
					for (var i = 0; i < scope.current.options.length; i++) {
						scope.options.push(scope.current.options[i]);
					}
				};
				scope.$watch('settings.questions', function(newval, old){
					scope.current = scope.settings.questions;
				});
				scope.next = function(answer){
					scope.answers.push(answer.value);
					if(!answer.end){
						scope.current = answer;
					}
					else{
						scope.showResults()(scope.answers);
						if(scope.returnStart){
							scope.current = scope.settings.questions;
							scope.answers = [];
						}
					}
				};
			}
		};
	}]);
})(angular.module('ndnapp'))