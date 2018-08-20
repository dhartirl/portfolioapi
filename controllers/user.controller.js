const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = function (req, res, next) {
    UserModel.findOne({
        username: req.body.username
    }, function(err, obj) {
        if(err) {
            res.send({ success: false, error: "Login failed, please try again" });
            return false;
        }
        
        console.log("Login from user:");
        console.log(obj);

        if(!obj) {
            res.send({ success: false, error: "Username/Password Incorrect" });
            return false;
        }

        bcrypt.compare(req.body.password, obj.password, function(err, comparison) {
            if(comparison === true) {
                let token = jwt.sign({
                    id: obj._id
                }, 
                config.authSecret,
                {
                    expiresIn: 86400
                });
                res.send({
                    token: token,
                    username: obj.username,
                    accessLevel: obj.accessLevel
                });
                return true;
            } else {
                res.send({ success: false, error: 'Username/Password Incorrect' });
                return false;
            }
        });
    });
};

exports.logout = function(req, res, next) {
    res.send({ "success": true });
    return true;
}

exports.create = function (req, res, next) {
    
    // Do not allow unauthenticated users to create other users
    // Do not allow users to create a user with an access level less than their own
    if(req.accessLevel < 1 || req.accessLevel < req.body.accessLevel) {
        res.status(401);
        res.send("Access Denied");
        return false;
    }

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err) return next(err);
            let userToCreate = new UserModel({
                username: req.body.username,
                password: hash,
                accessLevel: req.body.accessLevel
            });
            
            userToCreate.save(function(err, detail) {
                if(err) return next(err);
                res.status(201);
                res.send({
                    username: detail.username,
                    accessLevel: detail.accessLevel
                });
            });

        });
    });
};