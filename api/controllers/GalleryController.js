module.exports = {
    index: function(req, res){
        GalleryService.getByDisplay('gallery')
        .then(function (data) {
            return res.view('gallery/index', { gallery: data });
        });
    },
    save: function (req, res) {
        GalleryService.save(req.body)
        .then(function (params) {
            return res.ok(params);
        }).catch(function (params) {
            return res.serverError(params);
        });
    },
	upload: function(req, res){
		var options = {
			//dirname: '../public/uploads/images/places',
			newname: req.param('filename')+'.'+req.param('ext'),
			folder: sails.config.globals.google_drive.folders.gallery
		};

		FileService.upload(req.file('image'), options)
		.then(function(files){
			return res.ok(files);
		}).catch(function(err){
			res.serverError(err);
		});
    },
    all: function (req, res) {
        GalleryService.getAll()
        .then(function (data) {
            return res.ok(data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },
    display: function (req, res) {
        GalleryService.getByDisplay(req.param('display'))
        .then(function (data) {
            return res.ok(data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },
    delete: function (req, res) {
        GalleryService.delete(req.param('id'))
        .then(function (data) {
            return res.ok(data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    }
}