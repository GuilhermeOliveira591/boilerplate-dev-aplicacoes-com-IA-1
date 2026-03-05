const express = require('express');
const courseController = require('../controllers/CourseController');
const router = express.Router();

router.post('/', courseController.create);

module.exports = router;
