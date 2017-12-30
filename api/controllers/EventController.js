/**
 * EventController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	comingsoon: function(req, res){
		EventService.getComingSoon()
        .then(function(results){
            res.ok(results);
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
	all: function(req, res){
		EventService.getAll()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	actives: function(req, res){
		EventService.getActives()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	save: function(req, res){
		EventService.save(req.body)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	actdeact: function(req, res){
		EventService.actDeact(req.body.id, req.body.act)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	detail: function(req, res){
		EventService.getEventByPath(req.param('path'))
        .then(function(evt){
            res.view({event: evt });
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
	upload: function(req, res){
		var options = {
			dirname: '../public/uploads/images/events',
			newname: req.param('filename')
		};

		FileService.upload(req.file('image'), options)
		.then(function(files){
			res.ok();
		}).catch(function(err){
			res.serverError(err);
		});
	},
	index: function (req, res) {
		var page = req.param('page') ? parseInt(req.param('page')): 1;
		EventService.getPaged(page)
		.then(function(data){
			EventService.getTotal()
            .then(function (t) {
                var pages = Math.ceil(t / 10);
                return res.view('event/index', {events: data, pages: pages, current: page});
            });
		}).catch(function(err){
			res.serverError(err);
		});
	}
};