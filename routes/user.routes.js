module.exports = app => {
    const user = require('../controllers/user.controller');
    const {checkValidation } = require('../validators/user.validate');
    let router = require('express').Router();

    //route to create a new tutorial
    router.post('/register',
        checkValidation('create'),
        user.create
    );

    router.post('/login',
        checkValidation('login'),
        user.login
    );

    app.use('/api/users', router);
}
