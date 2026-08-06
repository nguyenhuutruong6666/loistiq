const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Địa chỉ email không đúng định dạng.',
    'any.required': 'Email là bắt buộc.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự.',
    'any.required': 'Mật khẩu là bắt buộc.',
  }),
});

module.exports = {
  loginSchema,
};
