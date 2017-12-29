(function(app){
    'use strict';
    app.directive('file', [function () {
        return{
            restrict: 'E',
            scope:{
                fileread: '=',
                multiple: '@',
                inputClass: "@",
                accept: "@",
                inputName: "@",
                inputId: "@",
                preview: "=",
                previewImg: "@"
            },
            replace: true,
            template: '<input type="file" multiple="{{multiple}}" class="{{inputClass}}" accept="{{accept}}" name="{{inputName}}" id="{{inputId}}">',
            link: function (scope, element, attributes) {
                element.bind("change", function (evt) {
                    scope.$apply(function () {
                        scope.fileread = evt.target.files;
                    });
                    if(scope.preview){
                        var reader = new FileReader();

                        reader.onload = function(e) {
                            $(scope.previewImg).attr('src', e.target.result);
                        }
                        reader.readAsDataURL(evt.target.files[0]);
                    }
                });
            }
        };
    }]);
})(angular.module('ndnapp'));