const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail, sendOrganizationVerificationEmail } = require('../utils/email');
const upload = require('../middleware/upload');

// @route   POST api/auth/register/individual
// @desc    Register individual user
// @access  Public
router.post('/register/individual', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Please include a valid phone number').matches(/^[0-9]{10}$/),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('bloodGroup', 'Blood group is required').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, password, bloodGroup } = req.body;

    // Check for existing user
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    user = new User({
      name,
      email,
      phone,
      password,
      bloodGroup,
      userType: 'individual',
      verificationToken
    });

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/register/organization
// @desc    Register hospital or NGO
// @access  Public
router.post('/register/organization', [
  // Contact Person Details
  check('name', 'Contact person name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Please include a valid phone number').matches(/^[0-9]{10}$/),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  
  // Organization Details
  check('organizationDetails.name', 'Organization name is required').not().isEmpty(),
  check('organizationDetails.type', 'Organization type is required').isIn(['hospital', 'ngo', 'bloodbank']),
  check('organizationDetails.registrationNumber', 'Registration number is required').not().isEmpty(),
  
  // Address Validation
  check('organizationDetails.address.street', 'Street address is required').not().isEmpty(),
  check('organizationDetails.address.city', 'City is required').not().isEmpty(),
  check('organizationDetails.address.state', 'State is required').not().isEmpty(),
  check('organizationDetails.address.postalCode', 'Postal code is required').matches(/^[0-9]{6}$/),
  
  // Optional Fields
  check('organizationDetails.website', 'Please enter a valid URL').optional().isURL(),
  check('organizationDetails.hasBloodDonationCenter', 'Must be a boolean value').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      email,
      phone,
      password,
      organizationDetails
    } = req.body;

    // Check for existing organization
    let user = await User.findOne({
      $or: [
        { email },
        { phone },
        { 'organizationDetails.registrationNumber': organizationDetails.registrationNumber }
      ]
    });

    if (user) {
      return res.status(400).json({
        msg: 'Organization already registered or credentials are in use'
      });
    }

    // Create verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Longer expiry for organizations
    );

    // Create new organization user
    user = new User({
      name,
      email,
      phone,
      password,
      userType: organizationDetails.type === 'ngo' ? 'ngo' : 'hospital',
      organizationDetails: {
        ...organizationDetails,
        verificationDocuments: [], // To be updated later
        isVerified: false
      },
      verificationToken
    });

    await user.save();

    // Send verification email with additional instructions
    await sendOrganizationVerificationEmail(email, verificationToken, organizationDetails.type);

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      msg: 'Registration successful. Please check your email for verification instructions.'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('phone', 'Please include a valid phone number').matches(/^[0-9]{10}$/),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phone, password } = req.body;

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, userType: user.userType });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  check('email', 'Please include a valid email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', [
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/organization/upload-documents
// @desc    Upload organization verification documents
// @access  Private
router.post('/organization/upload-documents', auth, upload.array('documents', 5), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !['hospital', 'ngo'].includes(user.userType)) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Add uploaded document URLs to user's verificationDocuments array
    const documentUrls = req.files.map(file => file.path);
    user.organizationDetails.verificationDocuments.push(...documentUrls);
    await user.save();

    res.json({
      msg: 'Documents uploaded successfully',
      documents: user.organizationDetails.verificationDocuments
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 