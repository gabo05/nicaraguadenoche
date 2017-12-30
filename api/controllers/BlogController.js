module.exports = {
    index: function (req, res) {
        var page = 1;
        if(req.param('page')){
            page: parseInt(req.param('page'));
        }
        ArticleService.getPublisheds(page)
        .then(function (data) {
            ArticleService.getTotal()
            .then(function (t) {
                var pages = Math.ceil(t / 10);
                return res.view('blog/index', {articles: data, pages: pages, current: page});
            });
        });
    },
    detail: function name(req, res) {
        ArticleService.getByPath(req.param('path'))
        .then(function (data) {
            return res.view('blog/article', {article: data});
        });
    }
};