module.exports = app => {
    const user = require('../controllers/user.controller');
    const {checkValidation } = require('../validators/user.validate');
    let router = require('express').Router();
    let {auth} = require('../middleware/auth.middleware');

    //route to create a new tutorial
    router.post('/register',
        checkValidation('create'),
        user.create
    );

    router.post('/login',
        checkValidation('login'),
        user.login
    );

    router.get('/auth',
        auth,
        user.authenticate
    );

    router.get('/logout',
        auth,
        user.logout
    )

    app.use('/api/users', router);
}
