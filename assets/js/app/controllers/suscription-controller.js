(function(app){
	'use strict';
	app.controller('suscriptionController', ['$scope', /*'toastr', */'suscriptionFactory', function($scope, /*toastr, */suscription){
		$scope.message = '';
		$scope.save = function(){
			suscription.save({email:$scope.email})
			.then(function(data){
				$scope.email = '';
				$scope.message = 'Correo enviado, gracias por suscribirte!';
				$('#message').fadeIn();
				$scope.$apply();
				//toastr.success('Correo enviado!', 'Nicaragua de Noche', {});
			}).catch(function(err){
				//toastr.error('Hubo un problema al enviar el correo', 'Nicaragua de Noche');
			});
		}
	}]);
})(angular.module('ndnapp'));