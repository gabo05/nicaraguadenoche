(function (app) {
    app.directive('imageFallback', function () {
        return {
            scope:{
                imageFallback: '='
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    element.attr('src', scope.imageFallback); // set default image
                });
            }
        }
    });
})(angular.module('ndnapp'));