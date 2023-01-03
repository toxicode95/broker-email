const { helloWorld } = require("./hello");
const { publish } = require("./sendmail");

module.exports = {
  helloWorld,
  publish,
}