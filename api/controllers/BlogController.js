module.exports = {
    index: function (req, res) {
        if(req.param('article')){
            ArticleService.getByPath(req.param('article'))
            .then(function (data) {
                return res.view('blog/article', {article: data});
            });
        }else{
            ArticleService.getPublisheds()
            .then(function (data) {
                return res.view('blog/index', {articles: data});
            });
        }
        
    }
};