module.exports = {
  formatter: () => (req, res, next) => {
    res.response = (status, content) => {
      res.status(status).send({
        message: content.message,
        data: content.data,
      });
    };
    next();
  },
};
