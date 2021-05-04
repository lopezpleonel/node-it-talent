/*
 *  ROUTER: Transferencia 
 *
*/
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TransferenciaController = require('../controllers/transferencia')

router.get('/listar', checkAuth, TransferenciaController.listarTransferencias);
router.post('/crear/:destinatarioId', checkAuth, TransferenciaController.crearTransferencia);

module.exports = router;