const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.put('/:id', userController.update);

module.exports = router;
