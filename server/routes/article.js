const articlecontroller = require('./../controllers/article.crtl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();

module.exports = (router) => {

    // get all articles
    router
        .route('/articles')
        .get(articlecontroller.getAll);
    
    // add article
    router
        .route('/article')
        .post(multipartWare, articlecontroller.addArticle);
    
    // comment on an article
    router
        .route('/article/comment')
        .post(articlecontroller.commentArticle);
    
    // get a particular article view
    router
        .route('/article/:id')
        .get(articlecontroller.getArticle)

    // clap an article
    router
        .route('/article/clap')
        .post(articlecontroller.clapArticle)

}