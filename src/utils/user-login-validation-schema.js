export const userLoginValidationSchema = {
  email: {
    notEmpty: {
      errrMessage: "Email cannot be empty",
    },
    isEmail: {
      errrMessage: "Must be a valid email",
    },
  },
  password: {
    notEmpty: {
      errrMessage: "Password cannot be empty",
    },
    isLength: {
      options: { min: 4 },
      errrMessage: 'Password must be at leat 4 characters'
    },
  },
};
