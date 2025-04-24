const express = require('express');
const router = express.Router();
const { validateRegisterInput, validateLoginInput } = require('../middleware/authValidation');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', validateRegisterInput, register);

router.post('/login', validateLoginInput, login);

router.get('/profile', auth, getProfile);

module.exports = router; 