const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const propertyRouter = require('./property.router');
const leadRouter = require('./lead.router');
const newsletterRouter = require('./newsletter.router');
const dashboardRouter = require('./dashboard.router');

// Định tuyến các phân hệ API
router.use('/auth', authRouter);
router.use('/properties', propertyRouter);
router.use('/leads', leadRouter);
router.use('/newsletter', newsletterRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
