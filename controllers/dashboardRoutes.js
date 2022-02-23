const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async(req,res) =>{
    console.log('in dashboard routes')
    try {
        
        const userProfile = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: BlogPost,
                }
            ]
        });

        const profile = userProfile.get({ plain: true });
        console.log(profile)
        res.render('dashboard', {
            profile,
            logged_in: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//NEED TO EDIT THIS NOT 
//where do i get this route???
router.get('/editPost/:id', async (req, res) => {
    try {
        const editPost = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attribute: ['name']
                },
            ],
        });
        const editPosts = editPost.get({ plain:true });
        console.log(editPosts)
        res.render('editPost', {
            editPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
    // if (req.session.logged_in) {
    //     res.redirect('/editPost');
    //     return;
    // }

    // res.render('login');
}); 

// router.post('/', withAuth, async(req, res) => {
//     try{
//         const newBlogPost = await BlogPost.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newBlogPost);
//     } catch (err) {
//         res.status(400).json({ message: "error creating new blog post", err });
//     }
// });

// router.delete('/:id', withAuth, async(res,res) =>{
//     try {
//         const blogData = await BlogPost.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });
//     }
// })

module.exports = router;