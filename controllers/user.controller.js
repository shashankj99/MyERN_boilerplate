const db = require('../models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = db.users;
const Op = db.Sequelize.Op;

const SALT_ROUNDS = 10;

// create and save a new user
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

            // create a user instance
            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            };

            // save the user in the database
            await User.create(user).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "An error occurred while registering the users"
                });
            });
            return next();
        }

        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

        return res.status(422).json({
            errors: extractedErrors,
        });
    } catch (error) {
        return next(error);
    }
}

// user login
exports.login = (req, res, next) => {
    try {
        const errors = validationResult(req);

        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

        return res.status(422).json({
            errors: extractedErrors,
        });
    } catch (error) {
        return next(error);
    }
}

