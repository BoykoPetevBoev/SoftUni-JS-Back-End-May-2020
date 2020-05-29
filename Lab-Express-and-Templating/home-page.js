const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.status(302).redirect('/');
})
router.get('/', (req, res) => {
    res.status(200);
    return res.render('home-page', { layout: 'main' });
})
router.post('/', (req, res) => {
    return res.send('This is Home Page! POST request.');
})
router.put('/', (req, res) => {
    return res.send('This is Home Page! PUT request.');
})

module.exports = router;