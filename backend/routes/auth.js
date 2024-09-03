const express = require('express');
const {login} = require('../controllers/authController');
const  router = express.Router();

// Auth routes
router.post('/login', login);

// Success route
router.get('/success', (req, res) => {
    res.json({ token: req.query.token });
});

module.exports = router;

//del
