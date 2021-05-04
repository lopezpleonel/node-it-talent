/*
 *  CONTROLLER: Destinatario 
 *
*/
const mongoose = require('mongoose');
const Destinatario = require('../models/destinatario');

const controller = {};

controller.listarDestinatarios = (req, res)=> {
    Destinatario.find()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error : err });
    })
}

controller.crearDestinatario = (req, res, next) => {

    const destinatario = new Destinatario({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        rut : req.body.rut,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        bankName : req.body.bankName,
        accountType : req.body.accountType,
        accountNumber : req.body.accountNumber
    });

    destinatario
        .save()
        .then(result => {
            res.status(201).json({
                message : "POST executed successfully",
                created : destinatario
            })
            console.log(result)
    })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(422).json({ succes: false, message: err.keyValue });
            } else {
                res.status(500).json({
                    message : err.keyValue
                })
            }
            console.log(err)
        });
}

module.exports = controller;