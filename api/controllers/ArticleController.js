/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: function(req, res){
		ArticleService.getAll()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	actives: function(req, res){
		ArticleService.getPublisheds()
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	save: function(req, res){
		req.body.author = req.user.name;
		req.body.userid = req.user.id;
		ArticleService.save(req.body)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	pubunpub: function(req, res){
		ArticleService.actDeact(req.body.id, req.body.pub)
		.then(function(data){
			res.ok(data);
		}).catch(function(err){
			res.serverError(err);
		});
	},
	detail: function(req, res){
		ArticleService.getByPath(req.param('path'))
        .then(function(art){
            res.view({article: art });
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
	upload: function(req, res){
		var options = {
			//dirname: '../public/uploads/images/blog',
			newname: req.param('filename')+'.'+req.param('ext'),
			folder: sails.config.globals.google_drive.folders.blog
		};

		FileService.upload(req.file('image'), options)
		.then(function(files){
			if(req.param('update')=='true')
				return ArticleService.updateImage(req.param('filename'), files.id);
			else
				res.ok(files);
		}).catch(function(err){
			res.serverError(err);
		});
	}
};

