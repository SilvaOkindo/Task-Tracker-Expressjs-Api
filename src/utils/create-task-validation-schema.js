export const createTaskValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Task name cannot be empty'
        },
        isString: {
            errorMessage: 'Task name must be a string'
        }
    },
    description: {
        notEmpty: {
            errorMessage: 'Task description cannot be empty'
        },
        isString: {
            errorMessage: 'Task description must be a string'
        }
    }
}