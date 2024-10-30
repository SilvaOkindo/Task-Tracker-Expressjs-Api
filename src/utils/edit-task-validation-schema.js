export const editTaskValidationSchema = {
    name: {
        optional: true,
        isString: {
            errorMessage: 'Task name must be a string'
        }
    },
    description: {
        optional: true,
        isString: {
            errorMessage: 'Task description must be a string'
        }
    },
    status: {
        optional: true,
        notEmpty: {

        }
    }
}