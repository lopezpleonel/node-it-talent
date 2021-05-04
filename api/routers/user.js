/*
 *  ROUTER: User 
 *
*/
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')

router.post('/signup', UserController.registrar);
router.post('/login', UserController.autenticar);

module.exports = router;