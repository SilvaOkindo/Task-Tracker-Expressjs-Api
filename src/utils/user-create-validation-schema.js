export const userCreateValidationSchema = {
    username: {
        notEmpty: {
            errrMessage: 'User name cannot be empty'
        },
        isString: {
            errrMessage: 'User name must be a string'
        }
    },
    email: {
        notEmpty: {
            errrMessage: 'Email cannot be empty'
        },
        isEmail: {
            errrMessage: 'Must be a valid email'
        }
    },
    password: {
        notEmpty: {
            errrMessage: 'Password cannot be empty'
        },
        isLength: {
            options: {min: 4}
        }
    }
}