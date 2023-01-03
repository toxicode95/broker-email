const emailValidator = require('email-validator');
const { httpStatus } = require('../config/constants');
const { publish } = require('../service');

class Controller {
  async publish(req, res) {
    try {
      const { body } = req;
      const { email } = body;
      if (!email) {
        return res.response(httpStatus.ok, {
          message: 'email is required!',
        });
      }
      const valid = emailValidator.validate(email);
      if (!valid) {
        return res.response(httpStatus.ok, {
          message: 'email is not valid!',
        });
      }
      const result = await publish(email);
      return res.status(httpStatus.ok).send({
        message: result
      });
    } catch (e) {
      return res.status(httpStatus.internalServerError).send({
        message: e.message
      });
    }
  }
}

module.exports = new Controller();