/**
 * SuscriptionController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function(req, res){
		var email = req.body ? req.body.email : undefined;
        if (!email) {
            return res.badRequest("El correo es requerido");
        } else {
            Suscription.findOne( { email : email })
                .then( (susc) => {
                    if(!susc) {
                    	Suscription.create({ email: email})
		                .then( (nsusc) => {
		                	return res.json({success: true});
		                })
		                .catch( (err) => res.serverError(err));
                    } else {
                        return res.json({success: true});
                    }
                })
                .catch((err)=> res.serverError(err));
        }
	}
};

