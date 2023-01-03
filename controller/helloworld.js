const { httpStatus } = require('../config/constants');
const { helloWorld } = require('../service');

class Controller {
  helloWorld(req, res) {
    try {
      const result = helloWorld();
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