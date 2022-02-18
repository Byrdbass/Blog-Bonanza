const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req,res) => {
    console.log ('this is the comment route')
    console.log(req.body)
    console.log(req.session.user_id)
        try {
            const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        console.log(commentData)
        res.status(200).json({message: "comment successfully created"});
    } catch (err) {
        res.status(400).json({ message: "error posting comment"})
    }
})

module.exports = router;