const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  requestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  urgencyLevel: {
    type: String,
    enum: ['normal', 'urgent', 'critical'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  additionalInfo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema); 