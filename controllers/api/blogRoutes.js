const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json({message: "successfully created new blog post", newBlogPost});
    } catch (err) {
        res.status(400).json({ message: "error posting new blog post", err})
    }
});

router.put('/:id', async (req, res) =>{
    console.log('hello this is the put route')
    console.log(req.body)
    console.log(req.params.id)
    try {
        const blogPost = await BlogPost.update(
            {
                topic: req.body.topic,
                content: req.body.content,
                //does this need to come from the built-in methods
                date_created: Date.now()
            },
            //what id are we passing here?  the topic id?
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(blogPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: "there is no blog post associated with this id"});
            return;
        }

        res.status(200).json({message: "successfully deleted blog post", blogData})
    } catch (err) {
        res.status(500).json({message: "error deleting this blog post", err})
    }
})

module.exports = router;