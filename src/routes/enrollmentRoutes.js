const express = require('express');
const enrollmentController = require('../controllers/EnrollmentController');
const router = express.Router();

router.post('/', enrollmentController.create);

module.exports = router;
