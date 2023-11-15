const router = require('express').Router();
const { Article, Comment, User } = require('../models'); // Fix the import path
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const articleData = await Article.findAll({ // Fix the typo: change post to Article
            where: {
                user_id: req.session.user_id
            },
            include: [
                 {
                    model: User,
                    attributes: ['username', 'articleTitle', 'articleContent']
                 },
                 {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                 },
            ],
        });
        const articleDash = articleData.map((article) => article.get({ plain: true }));
        console.log(articleDash);
        res.render('dashboard', { // Fix the syntax error: move the parenthesis
            articleDash,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const articleEditData = await Article.findByPk(req.params.id);
        const articleEdit = articleEditData.get({ plain: true });
        res.render('editArticle', { editArticle: articleEdit }); // Add : articleEdit
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
