/*
 *  COLLECTION: Transferencia 
 *
*/
const mongoose = require('mongoose');

const Transferencia = mongoose.model(
    'Transferencia', 
    new mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        amount : { type: String, required: true },
        createdAt : String
    })
);

// export
module.exports = Transferencia;