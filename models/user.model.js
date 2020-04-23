module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                min: 6
            },
            allowNull: false
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING
        },
        token_exp: {
            type: Sequelize.INTEGER
        }
    });

    return User;
};
