const Joi = require('joi');

const propertySchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Tên bất động sản là bắt buộc.',
  }),
  subtitle: Joi.string().allow('').default(''),
  category: Joi.string().required().messages({
    'any.required': 'Danh mục là bắt buộc.',
  }),
  price: Joi.string().required().messages({
    'any.required': 'Mức giá hiển thị là bắt buộc.',
  }),
  rawPrice: Joi.number().required().messages({
    'any.required': 'Mức giá dạng số là bắt buộc.',
  }),
  location: Joi.string().required().messages({
    'any.required': 'Khu vực vị trí là bắt buộc.',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Địa chỉ chi tiết là bắt buộc.',
  }),
  city: Joi.string().required().messages({
    'any.required': 'Thành phố là bắt buộc.',
  }),
  status: Joi.string().valid('Đang mở bán', 'Độc quyền', 'Sắp ra mắt', 'Đã bàn giao').default('Đang mở bán'),
  heroImage: Joi.string().uri().required().messages({
    'string.uri': 'Ảnh đại diện phải là đường dẫn URL hợp lệ.',
    'any.required': 'Ảnh đại diện là bắt buộc.',
  }),
  galleryImages: Joi.array().items(Joi.string()).default([]),
  sketchfabModelUrl: Joi.string().allow('', null),
  virtualTour360Url: Joi.string().allow('', null),
  area: Joi.string().required().messages({
    'any.required': 'Diện tích là bắt buộc.',
  }),
  bedrooms: Joi.number().integer().min(0).default(0),
  bathrooms: Joi.number().integer().min(0).default(0),
  floors: Joi.number().integer().min(1).default(1),
  yearBuilt: Joi.number().integer().default(2026),
  description: Joi.array().items(Joi.string()).default([]),
  highlights: Joi.array().items(Joi.string()).default([]),
  features: Joi.array().items(Joi.object()).default([]),
  amenities: Joi.array().items(Joi.object()).default([]),
  floorPlans: Joi.array().items(Joi.object()).default([]),
  architect: Joi.object().default({}),
  featuredInCarousel: Joi.boolean().default(false),
  bentoSize: Joi.string().valid('large', 'small', 'wide', null).allow(null),
});

module.exports = {
  propertySchema,
};
