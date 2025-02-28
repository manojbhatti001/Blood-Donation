const { check } = require('express-validator');

exports.validateLocation = [
  check('address', 'Address is required').not().isEmpty(),
  check('type', 'Invalid location type').isIn(['donor', 'bloodbank', 'hospital']),
  check('isAvailable', 'Availability status must be boolean').optional().isBoolean()
]; 