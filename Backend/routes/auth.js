const express = require('express');
const router = express.Router();
const { Register, Login } = require('../controllers/auth');

router.post('/users/register', Register);
router.post('/users/login', Login);

module.exports = router;
