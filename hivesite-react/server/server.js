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
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0;">
          <!-- Header with colored bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #ffc107, #ffca28); height: 8px;"></td>
          </tr>
          
          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding: 30px 20px 20px;">
              <img src="https://hivesite2.github.io/assets/main-logo-colors.png" alt="HIVE Logo" width="150" style="max-width: 150px;">
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 30px;">
              <h1 style="font-size: 28px; color: #333333; margin: 0 0 20px; text-align: center;">HIVE Smart Beekeeping</h1>
              <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Thank you for your interest in HIVE Smart Beekeeping! We've received your preorder request.</p>
              <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">We're excited to keep you updated as we develop our innovative beekeeping solution. You'll be among the first to know when our product launches.</p>
              <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">If you have any questions, feel free to reply to this email.</p>
            </td>
          </tr>
          
          <!-- Call to Action -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 6px; padding: 20px; text-align: center;">
                    <p style="margin: 0 0 15px; font-size: 18px; font-weight: 600;">Stay Connected</p>
                    <p style="margin: 0 0 20px; line-height: 1.5; font-size: 16px;">Follow us on social media for updates on our progress and beekeeping tips.</p>
                    <div>
                      <a href="https://instagram.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                        <img src="https://hivesite2.github.io/assets/instagram-icon.png" alt="Instagram" width="32" height="32" style="border: 0;">
                      </a>
                      <a href="https://twitter.com" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                        <img src="https://hivesite2.github.io/assets/twitter-icon.png" alt="Twitter" width="32" height="32" style="border: 0;">
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #333333; color: #ffffff; text-align: center; padding: 20px; font-size: 14px;">
              <p style="margin: 0 0 10px;">&copy; 2023 HIVE Smart Beekeeping. All rights reserved.</p>
              <p style="margin: 0;">123 Bee Street, Honeycomb City, HC 12345</p>
            </td>
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
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0;">
          <!-- Header with colored bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #ffc107, #ffca28); height: 8px;"></td>
          </tr>
          
          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding: 30px 20px 20px;">
              <img src="https://hivesite2.github.io/assets/main-logo-colors.png" alt="HIVE Logo" width="150" style="max-width: 150px;">
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 30px;">
              <h1 style="font-size: 28px; color: #333333; margin: 0 0 20px; text-align: center;">Exciting News!</h1>
              <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;"><strong>HIVE Smart Beekeeping is now available for purchase!</strong></p>
              <p style="margin: 0 0 20px; line-height: 1.6; font-size: 16px;">Thank you for your patience and interest in our smart beekeeping solution. We're thrilled to announce that our product is ready and you can now place your order.</p>
              <p style="margin: 0 0 30px; line-height: 1.6; font-size: 16px;">As one of our early supporters, you have priority access to our limited first production run.</p>
            </td>
          </tr>
          
          <!-- Call to Action Button -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <a href="https://hivesite2.github.io/order" style="display: inline-block; background-color: #ffc107; color: #333333; text-decoration: none; padding: 15px 30px; border-radius: 4px; font-weight: bold; font-size: 18px;">ORDER NOW</a>
            </td>
          </tr>
          
          <!-- Product Features -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing: 0;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 6px; padding: 20px;">
                    <h2 style="margin: 0 0 15px; font-size: 22px; color: #333333;">Key Features:</h2>
                    <ul style="margin: 0; padding: 0 0 0 20px; line-height: 1.6;">
                      <li style="margin-bottom: 10px;">Smart monitoring of hive conditions</li>
                      <li style="margin-bottom: 10px;">Real-time alerts and notifications</li>
                      <li style="margin-bottom: 10px;">Comprehensive analytics dashboard</li>
                      <li style="margin-bottom: 10px;">Easy installation and setup</li>
                      <li>One year warranty and dedicated support</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Limited Time Offer -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <p style="margin: 0; font-weight: bold; font-size: 18px; color: #d32f2f;">Limited Time Offer: Use code PRE10 for 10% off your order!</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #333333; color: #ffffff; text-align: center; padding: 20px; font-size: 14px;">
              <p style="margin: 0 0 10px;">&copy; 2023 HIVE Smart Beekeeping. All rights reserved.</p>
              <p style="margin: 0;">123 Bee Street, Honeycomb City, HC 12345</p>
            </td>
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