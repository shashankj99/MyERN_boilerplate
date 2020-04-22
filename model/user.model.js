module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        first_name: {
            type: Sequelize.STRING(50),
        },
        last_name: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                min: 6
            }
        },
        role: {
            type: Sequelize.INTEGER,

        },
        token: {
            type: Sequelize.STRING
        },
        token_exp: {
            type: Sequelize.STRING
        }
    });

    return User;
};
