const express = require('express');
const router = express.Router();

router.get('/portfolio', (req, res) => {
    res.render('portfolio', { 
        pageTitle: '3D Portfolio',
        name: 'Your Name',
        tagline: 'Creative Developer & 3D Enthusiast'
    });
});

module.exports = router;
