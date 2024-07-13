const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow the Content-Type header
}));

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pittaimp17@gmail.com',
    pass: 'pxgw sitv esyt jrwb'
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'sravyareddyy17@gmail.com',
    subject: subject,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Detailed error logged on the server.',
        error: error.message
      });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
