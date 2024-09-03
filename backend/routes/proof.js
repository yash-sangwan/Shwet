const express = require('express');
const {requestProof} = require('../controllers/proofController');
const {verifyLogin} = require('../controllers/authController')
const router = express.Router();

router.get('/request-proof', verifyLogin, requestProof);

module.exports = router;

//del

