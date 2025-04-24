require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const Preorder = require('./models/Preorder');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter configuration
let transporter;

// Function to create Ethereal test account (development fallback)
async function createTestAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created Ethereal test account:', testAccount.user);
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('Ethereal transporter configured');
  } catch (error) {
    console.error('Failed to create Ethereal account:', error);
  }
}

// Configure real SMTP if credentials are provided; otherwise use Ethereal
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('SMTP transporter configured with host:', process.env.SMTP_HOST);
} else {
  createTestAccount();
}

// API endpoint for preorder signups
app.post('/api/preorder', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  try {
    // Check if email already exists
    const existingPreorder = await Preorder.findOne({ email });
    
    if (existingPreorder) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    
    // Create new preorder
    const preorder = new Preorder({ email });
    await preorder.save();
    
    console.log(`Email ${email} added to preorder list with ID: ${preorder._id}`);
    
    // Send confirmation email immediately
    sendConfirmationEmail(email)
      .then(() => {
        console.log('Confirmation email sent successfully');
      })
      .catch(error => {
        console.error('Error sending confirmation email:', error);
      });
    
    res.status(201).json({ message: 'Preorder registration successful' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API endpoint for support form submissions
app.post('/api/support', async (req, res) => {
  const { name, email, subject, message, website } = req.body;
  
  // Check honeypot field - if it's filled, it's likely a bot
  if (website) {
    console.log(`Honeypot triggered - bot submission detected from ${email}`);
    // Return success to the bot but don't process the submission
    return res.status(200).json({ message: 'Form submitted successfully' });
  }
  
  if (!email || !name || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    // Send support email
    await sendSupportEmail(name, email, subject, message);
    
    console.log(`Support request received from ${email}, subject: ${subject}`);
    
    res.status(200).json({ message: 'Support request received. We will contact you shortly.' });
  } catch (error) {
    console.error('Error processing support request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// TESTING ONLY: Get all registered emails
app.get('/api/admin/preorders', async (req, res) => {
  try {
    const preorders = await Preorder.find().sort({ signup_date: -1 });
    res.status(200).json({ preorders });
  } catch (error) {
    console.error('Error fetching preorders:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// TESTING ONLY: Manually trigger notification email
app.post('/api/admin/send-notification', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  // Send notification immediately
  sendNotificationEmail(email)
    .then(() => {
      res.status(200).json({ message: 'Notification sent' });
    })
    .catch(error => {
      console.error('Error sending notification:', error);
      res.status(500).json({ message: 'Failed to send notification' });
    });
});

// TESTING ONLY: Clear all preorders from database
app.delete('/api/admin/preorders', async (req, res) => {
  try {
    const result = await Preorder.deleteMany({});
    console.log(`Cleared all preorders. Rows affected: ${result.deletedCount}`);
    res.status(200).json({ 
      message: 'Database cleared successfully',
      rowsDeleted: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing database:', error.message);
    return res.status(500).json({ message: 'Failed to clear database' });
  }
});

// Function to send support request email
const sendSupportEmail = async (name, email, subject, message) => {
  if (!transporter) {
    console.error('Email transporter not initialized');
    throw new Error('Email service unavailable');
  }
  
  // Email to the support team
  const supportMailOptions = {
    from: '"HIVE Website" <hiveappreply@gmail.com>',
    to: process.env.SUPPORT_EMAIL || 'hiveappreply@gmail.com',
    subject: `HIVE Support Request: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Support Request</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #212121;">
        <!-- Outer wrapper for wavy side backgrounds -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9;">
          <tr>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: left center;"></td>
            <td align="center" style="padding: 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                <!-- Header with honey gradient -->
                <tr>
                  <td style="background: linear-gradient(90deg, #FFC107, #FF9800, #FF6F00); height: 12px;"></td>
                </tr>
                
                <!-- Logo -->
                <tr>
                  <td style="text-align: center; padding: 40px 20px 30px;">
                    <img src="https://i.imgur.com/kjI6egd.png" alt="HIVE Logo" width="180" style="max-width: 180px; height: auto;">
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 20px 30px 30px;">
                    <h1 style="font-size: 28px; color: #212121; margin: 0 0 24px; text-align: center; font-weight: 700;">New Support Request</h1>
                    
                    <div style="background-color: #F5F5F5; padding: 25px; margin-bottom: 20px;">
                      <p style="margin: 0 0 10px; font-weight: 600;">Contact Information:</p>
                      <p style="margin: 0 0 5px;"><strong>Name:</strong> ${name}</p>
                      <p style="margin: 0 0 5px;"><strong>Email:</strong> ${email}</p>
                      <p style="margin: 0 0 5px;"><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <p style="margin: 0 0 10px; font-weight: 600;">Message:</p>
                    <div style="background-color: #FFF8E1; border-left: 4px solid #FFC107; padding: 15px; margin: 0 0 25px;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #212121, #424242); color: #ffffff; text-align: center; padding: 30px; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2024 HIVE Smart Beekeeping. All rights reserved.</p>
                    <p style="margin: 0;">This message was sent from the HIVE website contact form.</p>
                  </td>
                </tr>
              </table>
            </td>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: right center;"></td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
  
  // Confirmation email to the user
  const userConfirmationOptions = {
    from: '"HIVE Support" <hiveappreply@gmail.com>',
    to: email,
    subject: 'We Received Your Support Request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support Request Confirmation</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #212121;">
        <!-- Outer wrapper for wavy side backgrounds -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9;">
          <tr>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: left center;"></td>
            <td align="center" style="padding: 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                <!-- Header with honey gradient -->
                <tr>
                  <td style="background: linear-gradient(90deg, #FFC107, #FF9800, #FF6F00); height: 12px;"></td>
                </tr>
                
                <!-- Logo -->
                <tr>
                  <td style="text-align: center; padding: 40px 20px 30px;">
                    <img src="https://i.imgur.com/kjI6egd.png" alt="HIVE Logo" width="180" style="max-width: 180px; height: auto;">
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 20px 30px 30px;">
                    <h1 style="font-size: 32px; color: #212121; margin: 0 0 24px; text-align: center; font-weight: 700;">HIVE Smart Beekeeping</h1>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Hi ${name},</p>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Thank you for contacting HIVE Support. We've received your message regarding "${subject}" and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #FFF8E1; border-left: 4px solid #FFC107; padding: 15px; margin: 25px 0; border-radius: 4px;">
                      <p style="margin: 0; line-height: 1.6; font-size: 16px;">Our support team typically responds within 24 business hours. If your matter is urgent, please call our support line at +1 (800) 555-1234.</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Support Hours -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; padding: 25px; text-align: center;">
                          <h3 style="margin: 0 0 15px; font-size: 18px; color: #212121; font-weight: 600;">Support Hours</h3>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                            <tr>
                              <td width="50%" style="padding: 5px 10px; text-align: right; font-weight: 600;">Monday - Friday:</td>
                              <td width="50%" style="padding: 5px 10px; text-align: left;">8:00 AM - 8:00 PM CET</td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 10px; text-align: right; font-weight: 600;">Saturday:</td>
                              <td width="50%" style="padding: 5px 10px; text-align: left;">9:00 AM - 5:00 PM CET</td>
                            </tr>
                            <tr>
                              <td width="50%" style="padding: 5px 10px; text-align: right; font-weight: 600;">Sunday:</td>
                              <td width="50%" style="padding: 5px 10px; text-align: left;">Closed</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Call to Action -->
                <tr>
                  <td style="padding: 0 30px 40px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #FFFDE7; padding: 25px; text-align: center; border: 1px dashed #FFC107;">
                          <p style="margin: 0 0 15px; font-size: 20px; font-weight: 600; color: #FF6F00;">Connect With Us</p>
                          <p style="margin: 0 0 20px; line-height: 1.5; font-size: 16px; color: #616161;">Follow us on social media for updates and beekeeping tips.</p>
                          <div>
                            <!-- Social media icons -->
                            <a href="https://instagram.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="36" height="36" style="border: 0;">
                            </a>
                            <a href="https://twitter.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="36" height="36" style="border: 0;">
                            </a>
                            <a href="https://facebook.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="36" height="36" style="border: 0;">
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #212121, #424242); color: #ffffff; text-align: center; padding: 30px; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2024 HIVE Smart Beekeeping. All rights reserved.</p>
                    <p style="margin: 0;">Old Dublin Rd, Galway, H91 DCH9</p>
                    <div style="margin-top: 20px;">
                      <a href="https://hivesite2.github.io/privacy" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                      <a href="https://hivesite2.github.io/terms" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: right center;"></td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
  
  try {
    // Send email to support team
    await transporter.sendMail(supportMailOptions);
    
    // Send confirmation to user
    await transporter.sendMail(userConfirmationOptions);
    
    return true;
  } catch (error) {
    console.error('Error sending support emails:', error);
    throw error;
  }
};

// Function to send confirmation email
const sendConfirmationEmail = async (email) => {
  if (!transporter) {
    console.error('Email transporter not initialized');
    return;
  }
  
  const mailOptions = {
    from: '"HIVE Beekeeping" <hiveappreply@gmail.com>',
    to: email,
    subject: 'Thank You for Your Interest in HIVE Smart Beekeeping',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You from HIVE Smart Beekeeping</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #212121;">
        <!-- Outer wrapper for wavy side backgrounds -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9;">
          <tr>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: left center;"></td>
            <td align="center" style="padding: 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                <!-- Header with honey gradient -->
                <tr>
                  <td style="background: linear-gradient(90deg, #FFC107, #FF9800, #FF6F00); height: 12px;"></td>
                </tr>
                
                <!-- Logo -->
                <tr>
                  <td style="text-align: center; padding: 40px 20px 30px;">
                    <img src="https://i.imgur.com/kjI6egd.png" alt="HIVE Logo" width="180" style="max-width: 180px; height: auto;">
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 20px 30px 30px;">
                    <h1 style="font-size: 32px; color: #212121; margin: 0 0 24px; text-align: center; font-weight: 700;">HIVE Smart Beekeeping</h1>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Thank you for your interest in HIVE Smart Beekeeping! We've received your preorder request.</p>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">We're excited to keep you updated as we develop our innovative beekeeping solution. You'll be among the first to know when our product launches.</p>
                    
                    <div style="background-color: #FFF8E1; border-left: 4px solid #FFC107; padding: 15px; margin: 25px 0; border-radius: 4px;">
                      <p style="margin: 0; line-height: 1.6; font-size: 16px;">If you have any questions, feel free to reply to this email.</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Product Preview -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; padding: 25px; text-align: center;">
                          <img src="https://i.imgur.com/uHl0XDs.png" alt="HIVE Dashboard" style="max-width: 100%; height: auto; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                          <h3 style="margin: 0 0 15px; font-size: 20px; color: #212121; font-weight: 600;">Smart Monitoring System</h3>
                          <p style="margin: 0; line-height: 1.5; font-size: 15px; color: #616161;">Our innovative solution helps beekeepers monitor hive health, prevent colony loss, and increase honey production.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Call to Action -->
                <tr>
                  <td style="padding: 0 30px 40px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #FFFDE7; padding: 25px; text-align: center; border: 1px dashed #FFC107;">
                          <p style="margin: 0 0 15px; font-size: 20px; font-weight: 600; color: #FF6F00;">Stay Connected</p>
                          <p style="margin: 0 0 20px; line-height: 1.5; font-size: 16px; color: #616161;">Follow us on social media for updates on our progress and beekeeping tips.</p>
                          <div>
                            <!-- Social media icons with honey color -->
                            <a href="https://instagram.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="36" height="36" style="border: 0;">
                            </a>
                            <a href="https://twitter.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="36" height="36" style="border: 0;">
                            </a>
                            <a href="https://facebook.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="36" height="36" style="border: 0;">
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Key Benefits -->
                <tr>
                  <td style="padding: 0 30px 40px;">
                    <h3 style="margin: 0 0 20px; font-size: 20px; color: #212121; text-align: center; font-weight: 600;">Why Choose HIVE?</h3>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td width="33%" style="text-align: center; padding: 0 10px;">
                          <div style="background-color: rgba(255, 193, 7, 0.1); border-radius: 50%; width: 60px; height: 60px; margin: 0 auto 15px; text-align: center; line-height: 60px;">
                            <img src="https://i.imgur.com/V01gBOZ.png" alt="Monitoring Icon" width="30" height="30" style="border: 0; display: inline-block; vertical-align: middle;">
                          </div>
                          <p style="margin: 0; font-weight: 600; font-size: 15px; color: #424242;">Real-time Monitoring</p>
                        </td>
                        <td width="33%" style="text-align: center; padding: 0 10px;">
                          <div style="background-color: rgba(255, 193, 7, 0.1); border-radius: 50%; width: 60px; height: 60px; margin: 0 auto 15px; text-align: center; line-height: 60px;">
                            <img src="https://i.imgur.com/albZ4cy.png" alt="Alerts Icon" width="36" height="36" style="border: 0; display: inline-block; vertical-align: middle;">
                          </div>
                          <p style="margin: 0; font-weight: 600; font-size: 15px; color: #424242;">Smart Alerts</p>
                        </td>
                        <td width="33%" style="text-align: center; padding: 0 10px;">
                          <div style="background-color: rgba(255, 193, 7, 0.1); border-radius: 50%; width: 60px; height: 60px; margin: 0 auto 15px; text-align: center; line-height: 60px;">
                            <img src="https://i.imgur.com/IbzsNJ8.png" alt="Insights Icon" width="30" height="30" style="border: 0; display: inline-block; vertical-align: middle;">
                          </div>
                          <p style="margin: 0; font-weight: 600; font-size: 15px; color: #424242;">Data Insights</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #212121, #424242); color: #ffffff; text-align: center; padding: 30px; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2024 HIVE Smart Beekeeping. All rights reserved.</p>
                    <p style="margin: 0;">Old Dublin Rd, Galway, H91 DCH9</p>
                    <div style="margin-top: 20px;">
                      <a href="https://hivesite2.github.io/privacy" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                      <a href="https://hivesite2.github.io/terms" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                      <a href="https://hivesite2.github.io/unsubscribe" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: right center;"></td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    
    // For Ethereal test accounts, log preview URL
    if (info.messageId && info.messageId.includes('ethereal')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// Function to send notification email (when product is available)
const sendNotificationEmail = async (email) => {
  if (!transporter) {
    console.error('Email transporter not initialized');
    return;
  }
  
  const mailOptions = {
    from: '"HIVE Beekeeping" <hiveappreply@gmail.com>',
    to: email,
    subject: 'HIVE Smart Beekeeping - Product Now Available!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HIVE Smart Beekeeping is Now Available</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #212121;">
        <!-- Outer wrapper for wavy side backgrounds -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9;">
          <tr>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: left center;"></td>
            <td align="center" style="padding: 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">
                <!-- Header with honey gradient -->
                <tr>
                  <td style="background: linear-gradient(90deg, #FFC107, #FF9800, #FF6F00); height: 12px;"></td>
                </tr>
                
                <!-- Logo -->
                <tr>
                  <td style="text-align: center; padding: 40px 20px 30px;">
                    <img src="https://i.imgur.com/kjI6egd.png" alt="HIVE Logo" width="180" style="max-width: 180px; height: auto;">
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 10px 30px 30px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                      <span style="display: inline-block; background-color: #FFF8E1; color: #FF6F00; padding: 8px 20px; border-radius: 50px; font-weight: 600; font-size: 16px; border: 2px solid #FFC107;">🎉 NOW AVAILABLE!</span>
                    </div>
                    <h1 style="font-size: 32px; color: #212121; margin: 0 0 24px; text-align: center; font-weight: 700;">Exciting News!</h1>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 17px; font-weight: 600; color: #FF6F00; text-align: center;">HIVE Smart Beekeeping is now available for purchase!</p>
                    
                    <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Thank you for your patience and interest in our smart beekeeping solution. We're thrilled to announce that our product is ready and you can now place your order.</p>
                    
                    <p style="margin: 0 0 30px; line-height: 1.6; font-size: 16px;">As one of our early supporters, you have priority access to our limited first production run.</p>
                  </td>
                </tr>
                
                <!-- Product Preview -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; border-radius: 8px; padding: 25px; text-align: center;">
                          <img src="https://www.hiveapp.ie/assets/dashboard.png" alt="Dashboard" style="max-width: 100%; height: auto; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Call to Action Button -->
                <tr>
                  <td style="padding: 0 30px 30px; text-align: center;">
                    <a href="https://hivesite2.github.io/order" style="display: inline-block; background: linear-gradient(90deg, #FFC107, #FF9800); color: #212121; text-decoration: none; padding: 16px 35px; border-radius: 50px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3); transition: all 0.3s ease;">ORDER NOW</a>
                  </td>
                </tr>
                
                <!-- Limited Time Offer -->
                <tr>
                  <td style="padding: 0 30px 30px; text-align: center;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #FFFDE7; border-radius: 8px; padding: 25px; text-align: center; border: 1px dashed #FFC107;">
                          <p style="margin: 0 0 5px; font-size: 16px; color: #616161;">Limited Time Offer</p>
                          <p style="margin: 0; font-weight: 700; font-size: 22px; color: #FF6F00;">Use code <span style="background-color: #FFF3E0; padding: 5px 10px; border-radius: 4px;">PRE10</span> for 10% off!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Product Features -->
                <tr>
                  <td style="padding: 0 30px 40px;">
                    <h3 style="margin: 0 0 20px; font-size: 20px; color: #212121; text-align: center; font-weight: 600;">Key Features</h3>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                      <tr>
                        <td style="background-color: #F5F5F5; border-radius: 8px; padding: 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                            <tr>
                              <td width="50%" style="padding-right: 15px;">
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">Smart monitoring of hive conditions</p>
                                  </div>
                                </div>
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">Real-time alerts and notifications</p>
                                  </div>
                                </div>
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">Comprehensive analytics dashboard</p>
                                  </div>
                                </div>
                              </td>
                              <td width="50%" style="padding-left: 15px;">
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">Easy installation and setup</p>
                                  </div>
                                </div>
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">One year warranty and dedicated support</p>
                                  </div>
                                </div>
                                <div style="background-color: #FFFFFF; border-radius: 6px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                  <div style="display: flex; align-items: center;">
                                    <div style="min-width: 30px; width: 30px; height: 30px; background-color: rgba(255, 193, 7, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                      <span style="color: #FF9800; font-weight: bold; font-size: 14px;">✓</span>
                                    </div>
                                    <p style="margin: 0; font-weight: 500; font-size: 14px; color: #424242;">Mobile app for Android and iOS</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: linear-gradient(135deg, #212121, #424242); color: #ffffff; text-align: center; padding: 30px; font-size: 14px; border-radius: 0 0 12px 12px;">
                    <p style="margin: 0 0 10px;">&copy; 2023 HIVE Smart Beekeeping. All rights reserved.</p>
                    <p style="margin: 0;">123 Bee Street, Honeycomb City, HC 12345</p>
                    <div style="margin-top: 20px;">
                      <a href="https://hivesite2.github.io/privacy" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                      <a href="https://hivesite2.github.io/terms" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                      <a href="https://hivesite2.github.io/unsubscribe" style="color: #FFC107; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="120" style="background-image: url('https://i.imgur.com/vinNU4l.png'); background-repeat: repeat-y; background-position: right center;"></td>
          </tr>
        </table>
      </body>
      </html>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.messageId);
    
    // For Ethereal test accounts, log preview URL
    if (info.messageId && info.messageId.includes('ethereal')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    // Update the database to mark this user as notified
    await Preorder.findOneAndUpdate(
      { email },
      { notified: true },
      { new: true }
    );
    
    return info;
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 