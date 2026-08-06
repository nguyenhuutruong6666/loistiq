const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware kiểm tra và xác thực dữ liệu đầu vào bằng Joi schema
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return errorResponse(res, 'Dữ liệu yêu cầu không hợp lệ. Vui lòng kiểm tra lại.', 400, errorDetails);
    }

    req[property] = value;
    next();
  };
};

module.exports = {
  validate,
};
