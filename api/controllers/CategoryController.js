module.exports = {
    save: function (req, res) {
        CategoryService.save(req.body)
        .then(function (params) {
            return res.ok(params);
        }).catch(function (params) {
            return res.serverError(params);
        });
    },
    all: function (req, res) {
        CategoryService.getAll()
        .then(function (data) {
            return res.ok(data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },
    type: function (req, res) {
        CategoryService.getByType(req.param('type'))
        .then(function (data) {
            return res.ok(data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    }
}