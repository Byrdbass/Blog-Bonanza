const router = require('express').Router();
const { BlogPost, User } = require('../models');
//const withAuth - require('../utils/auth');

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
            //logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;