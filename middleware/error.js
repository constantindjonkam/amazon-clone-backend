const winston = require("winston");

function error(err, req, res, next) {
  winston.error("", err);

  res.status(500).send("Something failed.");
}

exports.error = error;
