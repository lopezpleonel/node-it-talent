/*
 *  ROUTER: Destinatario 
 *
*/ 
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const DestinatarioController = require('../controllers/destinatario');

router.get('/listar', checkAuth, DestinatarioController.listarDestinatarios);
router.post('/crear', checkAuth, DestinatarioController.crearDestinatario);

module.exports = router;