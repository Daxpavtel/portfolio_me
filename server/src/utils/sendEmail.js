const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_PORT === 465,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Sends an email notification to the site owner about a new contact message.
 * This function is explicitly non-blocking — it logs errors rather than throwing.
 *
 * @param {Object} msg - Saved message document from MongoDB
 */
async function sendContactNotification(msg) {
  if (!env.EMAIL_USER || !env.EMAIL_PASS || !env.OWNER_EMAIL) {
    console.warn('Email not configured — skipping notification');
    return;
  }

  try {
    const transporter = getTransporter();

    const text = `New Contact Message\n\nFrom: ${msg.name} (${msg.email})\nSubject: ${msg.subject}\n\n${msg.message}\n\n---\nIP: ${msg.ipAddress}\nSent: ${msg.createdAt}`;

    const html = `
      <h2>New Contact Message</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${msg.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${msg.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${msg.subject}</td></tr>
      </table>
      <hr>
      <p>${msg.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <small>IP: ${msg.ipAddress} &middot; ${msg.createdAt}</small>
    `;

    await transporter.sendMail({
      from: `"DevPortfolio Contact" <${env.EMAIL_USER}>`,
      to: env.OWNER_EMAIL,
      subject: `Portfolio Contact: ${msg.subject}`,
      text,
      html,
    });

    console.log('Contact notification email sent');
  } catch (err) {
    console.error('Failed to send email notification:', err.message);
  }
}

module.exports = { sendContactNotification };
