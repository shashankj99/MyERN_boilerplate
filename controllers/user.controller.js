const db = require('../models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = db.users;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

const SALT_ROUNDS = 10;

// create and save a new user
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

            // create a new user instance
            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            };

            //begin database transaction
            const t = await sequelize.transaction();

            // save the user in the database
            await User.create(user, {transaction: t}).then((data) => {
                t.commit();
                res.send(data);
            }).catch((err) => {
                t.rollback();
                res.status(500).send({
                    message: err.message || "An error occurred while registering the users"
                });
            });

            return next();
        } else {
            const extractedErrors = [];
            errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

            return res.status(422).json({
                errors: extractedErrors,
            });
        }
    } catch (error) {
        return next(error);
    }
}

// user login
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const user = await User.findOne({where: {email: req.body.email}});
            if (user) {
                const password = bcrypt.compareSync(req.body.password, user.dataValues.password);
                if(password) {
                    getToken = jwt.sign(user.id.toString(16), 'secret');
                    if (getToken) {
                        //begin database transaction
                        const t = await sequelize.transaction();
                        user.token = getToken;
                        await user.save({transaction: t});
                        t.commit();
                        
                        res.cookie("x_auth", user.token).status(200).json({"loginSuccess": true});
                    } else {
                        t.rollback();
                        return res.json({
                            "tokenGeneration": false,
                            "message": "Failed to generate token for this user"
                        });
                    }
                } else {
                    return res.json({
                        "loginSuccess": false,
                        "message": "Authentication failed, password didn't match"
                    });
                }
            } else {
                return res.json({
                    "loginSuccess": false,
                    "message": "Authentication failed, email not found"
                });
            }
        } else {
            const extractedErrors = [];
            errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

            return res.status(422).json({
                errors: extractedErrors,
            });
        }
    } catch (error) {
        return next(error);
    }
}
