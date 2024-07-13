const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://my-app-0xa3.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pittaimp17@gmail.com',
    pass: 'pxgw sitv esyt jrwb'
  }
});

// POST route for sending email
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

// Serve static files (assuming you have a build directory)
app.use(express.static(path.resolve(__dirname, '../build')));

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
