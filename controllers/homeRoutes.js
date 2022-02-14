const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) =>{
    try {
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });
        //serializing the data
        const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            //should we have the user logged in here?
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/topic/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                model: User,
                attributes: ['name']
                },
            ],
        });
    const blogPosts = blogData.get({ plain:true });

    res.render('topic', {
        blogPosts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

//DO WE ADD A USER PROFILE PAGE ROUTE HERE?
//make sure to use withAuth in this function

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;