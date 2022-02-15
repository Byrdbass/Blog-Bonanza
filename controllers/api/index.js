const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');

//these will navigate to the url on /page and go to the directory that is the constant - ('/page', const of page route)
router.use('/blog_post', blogRoutes);
router.use('/users', userRoutes)

module.exports = router;