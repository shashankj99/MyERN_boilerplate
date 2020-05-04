const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.cookies.x_auth;
    jwt.verify(token, 'secret', function(err, decode) {
        User.findOne({where: {"id": decode, "token": token}})
            .then((user) => {
                req.token = token,
                req.user = user.dataValues,
                next()
            })
            .catch((err) => {
                res.json({
                    isAuth: false,
                    error: true
                });
            });
    });
}
