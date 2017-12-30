/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: function(req, res){
		PlaceService.getAll()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	actives: function(req, res){
		PlaceService.getActives()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	save: function(req, res){
		PlaceService.save(req.body)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	actdeact: function(req, res){
		PlaceService.actDeact(req.body.id, req.body.act)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	detail: function(req, res){
		PlaceService.getByPath(req.param('path'))
        .then(function(pla){
            res.view({place: pla });
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
	upload: function(req, res){
		var options = {
			dirname: '../public/uploads/images/places',
			newname: req.param('filename')
		};

		FileService.upload(req.file('image'), options)
		.then(function(files){
			res.ok();
		}).catch(function(err){
			res.serverError(err);
		});
	}
};

