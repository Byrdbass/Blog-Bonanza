const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json({message: "Cannot add user, may be a duplicate entry", err});
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: "Invalid email"});
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ message: "Invalid password"});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Successfully Logged in"});
        });
    } catch (err) {
        res.status(400).json({ message: "error logging in", err })
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            //CAN I CREATE A LOGOUT MESSAGE HERE IN JSON???
            res.status(204).json({message: "you are now logged out"}).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;