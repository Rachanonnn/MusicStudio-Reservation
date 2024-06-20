const express = require('express');
const router = express.Router();

const { Register, Login } = require('../controllers/auth');

router.post('/auth/login', Register);
router.post('/auth/register', Login);