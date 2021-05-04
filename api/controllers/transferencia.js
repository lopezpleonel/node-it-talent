/*
 *  CONTROLLER: Transferencia 
 *
*/
const mongoose = require('mongoose');
const dateFormat = require('dateformat');

const Transferencia = require('../models/transferencia');
const Destinatario = require('../models/destinatario');

const controller = {};

controller.listarTransferencias = (req, res)=> {
    Destinatario.find().populate("transfers")
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

controller.crearTransferencia = (req, res, next) => {

    const transferencia = new Transferencia({
        _id : new mongoose.Types.ObjectId,
        amount : req.body.amount,
        createdAt : dateFormat(new Date(), "dd/mm/yyyy h:MM:ss")
    });

    transferencia
        .save()
        .then(result => {
            console.log(result)
            Destinatario.findByIdAndUpdate(
                req.params.destinatarioId,
                { $push : { transfers : transferencia._id }},
                { new : true, useFindAndModify : false }
            ).exec()
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error : err
                })
            })

            console.log(req.params.destinatario_id);
            console.log(transferencia._id);
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error : err
            })
        });

    res.status(201).json({
        message : "POST executed successfully",
        created : transferencia
    })
}

module.exports = controller;