const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || config.get('emailUser'),
    pass: process.env.EMAIL_PASSWORD || config.get('emailPassword')
  }
});

async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Welcome to Blood Donation Platform</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendPasswordResetEmail(email, token) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendOrganizationVerificationEmail(email, token, orgType) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-organization/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Verify Your ${orgType.toUpperCase()} Registration`,
    html: `
      <h1>Welcome to Blood Donation Platform</h1>
      <h2>${orgType.toUpperCase()} Registration Verification</h2>
      <p>Thank you for registering your organization with us. Please follow these steps to complete your registration:</p>
      <ol>
        <li>Click the verification link below</li>
        <li>Upload required verification documents:
          <ul>
            <li>Organization registration certificate</li>
            <li>License to operate (for hospitals)</li>
            <li>Authorization documents</li>
          </ul>
        </li>
        <li>Complete your organization profile</li>
      </ol>
      <a href="${verificationUrl}" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Verify Organization
      </a>
      <p>This link will expire in 7 days.</p>
      <p>If you have any questions, please contact our support team.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrganizationVerificationEmail
}; 