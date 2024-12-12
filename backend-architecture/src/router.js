// routes/router.js
const express = require('express');
const router = express.Router();

const {
} = require('./controllers');
// Helper function to handle requests
const handleRequest = (controller) => (req, res) => controller({ req, res });

// Inquiry Routes
// router.post('/inquiries', handleRequest(inquiryController.createInquiryAction));

module.exports = router;
