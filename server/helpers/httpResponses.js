const boom = require("@hapi/boom");

function unauthorized(res, message) {
  res.json(boom.unauthorized(message).output.payload);
}

function invalidToken(res) {
  res.json(unauthorized(res, "The user's token is invalid"));
}

function error(
  res,
  data = "An error while process the request",
  statusCode = 400
) {
  res.json({
    ok: false,
    error: true,
    data,
    statusCode,
  });
}
function success(
  res,
  data = "The request processed successfuly",
  statusCode = 200
) {
  res.json({
    ok: true,
    error: false,
    data,
    statusCode,
  });
}

module.exports = {
  unauthorized,
  invalidToken,
  success,
  error,
};
