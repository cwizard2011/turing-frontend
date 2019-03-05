import Validator from 'validatorjs';


/**
 * @class UserInputValidation
 */
class UserInputValidation {
  /**
   * validate user input on login
   *
   * @param {object} formInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static loginInputValidation(formInput) {
    const { email, password } = formInput;
    const validation = new Validator(
      {
        email,
        password
      },
      {
        email: 'required',
        password: 'required'
      },
      {
        'required.email': 'This :attribute is a required field.',
        'required.password': 'This :attribute is a required field.'
      }
    );

    const isValid = false;

    if (validation.passes()) {
      return {
        isValid: true
      };
    }

    const errors = validation.errors.all();

    return {
      isValid,
      errors
    };
  }
}

export default UserInputValidation;
