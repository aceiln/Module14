const router = require('express').Router();
const { Article, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Route for the homepage
router.get('/', async (req, res) => {
    try {
        const articleDB = await Article.findAll();
        const articleData = articleDB.map((articles) =>
            articles.get({ plain: true })
        );

        res.render('homepage', {
            articleData,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route for viewing a specific article
router.get('/article/:id', withAuth, async (req, res) => {
    try {
        const articleDB = await Article.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['commentData', 'timeStamp', 'username'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        // Send the article data as a response
        res.render('article', { articleData: articleDB });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
