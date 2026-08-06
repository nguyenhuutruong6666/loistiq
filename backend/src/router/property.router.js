const express = require('express');
const router = express.Router();
const propertyController = require('../controller/property.controller');
const { validate } = require('../middleware/validate.middleware');
const { propertySchema } = require('../validation/property.validation');
const { requireAuth } = require('../middleware/auth.middleware');

// Tuyến đường công khai (Client & Public)
router.get('/', propertyController.getProperties);
router.get('/:idOrSlug', propertyController.getPropertyById);

// Tuyến đường yêu cầu xác thực quản trị (Admin Only)
router.post('/', requireAuth, validate(propertySchema), propertyController.createProperty);
router.put('/:id', requireAuth, validate(propertySchema), propertyController.updateProperty);
router.delete('/:id', requireAuth, propertyController.deleteProperty);

module.exports = router;
