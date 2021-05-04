/*
 *  COLLECTION: Destinatario 
 *
*/
const mongoose = require('mongoose');

const Destinatario = mongoose.model(
    'Destinatario',
    new mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        name : String,
        rut : { type: String, required : true, unique: true }, 
        email : { type: String, required : true, unique: true }, 
        phoneNumber : String,
        bankName :  { type: String, required : true },
        accountType : { type: String, required : true },
        accountNumber : { type: String, required : true, unique: true },
        transfers : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Transferencia'
            }
        ]
}   )
);

// export
module.exports = Destinatario;