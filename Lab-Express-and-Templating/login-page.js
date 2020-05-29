const express = require('express');
const router = express.Router();

const authenticate = (req, res, next) => {
    const isAuthenticate = true;
    if (isAuthenticate) {
        return next();
    }
    return res.status(404).send('Invalid user authentication.');
}
router.get('/login', authenticate, (req, res, next) => {
    return res.status(200).render('login-page');
})

module.exports = router;