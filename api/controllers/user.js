/*
 *  CONTROLLER: Destinatario 
 *
*/
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {};

controller.registrar = (req, res, next) => {
    User.find({ email : req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json ({
                    message : "email already exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error : err.message
                        })
                    } else {
                        const user = new User ({
                            _id : new mongoose.Types.ObjectId,
                            email : req.body.email,
                            password : hash
                        });
                        user
                            .save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message : 'User created successfully'
                                })
                            })
                            .catch(err=> {
                                res.status(500).json({
                                    message : err.message
                                })
                            });
                    }
                });
            }
        })
        .catch(err=> {
            res.status(500).json({
                message : err
            })
        });
}    

controller.autenticar = (req, res, next) => {

    User.find({ email : req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json ({
                    message : "Authorization failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
                if (err) {
                    return res.status(401).json({
                        message : "Authorization failed" 
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                    }, 
                    "secret",
                    {
                        expiresIn : "1h"
                    })
                    res.status(200).json({
                        message : "Authorization successfull",
                        token : token
                    })
                }
            })
        })
        .catch(err=> {
            res.status(500).json({
                message : err.message
            })
        });


}

module.exports = controller;