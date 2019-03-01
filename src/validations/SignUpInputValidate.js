import Validator from 'validatorjs';

/**
 * @class SignUpInputValidation
 */
class SignUpInputValidation {
  /**
   * validate user input on sign up
   *
   * @param {object} userInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static InputValidation(userInput) {
    const {
      fullname, email, password, password_confirmation // eslint-disable-line
    } = userInput;

    const validation = new Validator(
      {
        fullname,
        email,
        password,
        password_confirmation
      },
      {
        fullname: 'required|string|min:5|max:40',
        email: 'required|string|email',
        password: 'required|min:8|max:40|confirmed',
        password_confirmation: 'required'
      },
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

export default SignUpInputValidation;
