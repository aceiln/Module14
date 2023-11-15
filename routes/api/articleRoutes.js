const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

//New post

router.post('/', withAuth, async(req,res) => {
    try {
        const newArticle = await Article.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newArticle);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Retrieve posts
router.get('/user', withAuth, async (req,res) => {
    try {
        const userArticleData = await Article.findAll({
            where: { user_id: req.session.user_id},
        });
        const userArticle = userArticleData.map(article => article.get ({ plain: true}));
        res.status(200).json(userPosts);
    } catch (err) { res.status(500).json(err);}
});

//edit Post
//edit Post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const editArticle = await Article.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id, // Fix the typo here
            },
            {
                where: { id: req.params.id },
            }
        );

        if (!editArticle) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }

        res.status(200).json(editArticle);
    } catch (err) {
        res.status(500).json(err);
    }
});
