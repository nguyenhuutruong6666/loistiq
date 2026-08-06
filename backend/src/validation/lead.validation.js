const Joi = require('joi');

const createLeadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Họ và tên là bắt buộc.',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Số điện thoại là bắt buộc.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ.',
    'any.required': 'Email là bắt buộc.',
  }),
  categoryInterest: Joi.string().required().messages({
    'any.required': 'Danh mục quan tâm là bắt buộc.',
  }),
  budget: Joi.string().required().messages({
    'any.required': 'Mức ngân sách dự kiến là bắt buộc.',
  }),
  propertyTitle: Joi.string().allow('', null),
  message: Joi.string().allow('', null),
});

const updateLeadStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Mới tiếp nhận', 'Đã liên hệ', 'Đã hẹn ngày xem', 'Thành công', 'Đã hủy')
    .required()
    .messages({
      'any.required': 'Trạng thái là bắt buộc.',
    }),
});

const newsletterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Địa chỉ email không đúng định dạng.',
    'any.required': 'Email là bắt buộc.',
  }),
});

module.exports = {
  createLeadSchema,
  updateLeadStatusSchema,
  newsletterSchema,
};
