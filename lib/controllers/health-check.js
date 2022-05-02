const healthCheck = (req, res, next) => {
  res.status(200).json("ok");
};

module.exports = { healthCheck };
