const nodemailer = require('nodemailer');

// Test email configuration
async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ Email configuration is valid!');

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Wizard',
      text: 'This is a test email to verify the configuration is working.',
      html: '<h1>Test Email</h1><p>This is a test email to verify the configuration is working.</p>'
    };

    console.log('Sending test email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully:', result.messageId);

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Full error:', error);
  }
}

testEmail();
