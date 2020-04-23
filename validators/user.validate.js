const { check } = require('express-validator');

exports.checkValidation = (method) => {
    switch (method) {
        case "create": {
            return [
                check("first_name").exists().withMessage("It is mandatory to enter your first name"),
                check("last_name").exists().withMessage("It is mandatory to enter your last name"),
                check("email").exists().withMessage("It is mandatory to enter email")
                .isEmail().withMessage("The email must be in correct format as foo@bar.com"),
                check("password").exists().withMessage("It is mandatory to enter password")
                .isLength({ min: 6 }).withMessage("Password must be at least 6 characters in length"),
                check("role").exists().withMessage("It is mandatory to enter role")
                .isInt().withMessage("Role must be a number")
            ];
        }
        case "login": {
            return [
                check("email").exists().withMessage("It is mandatory to enter email")
                .isEmail().withMessage("The email must be in correct format as foo@bar.com"),
                check("password").exists().withMessage("It is mandatory to enter password")
                .isLength({ min: 6 }).withMessage("Password must be at least 6 characters in length"),
            ];
        }
    }
}
