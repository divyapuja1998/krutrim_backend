// server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const db = require('./db');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// POST /register endpoint
// app.post('/register', (req, res) => {
//   const { name, email, mobile } = req.body;

//   if (!name || !email || !mobile) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const query = 'INSERT INTO enquire_now (name, email, mobile) VALUES (?, ?, ?)';

//   db.query(query, [name, email, mobile], (err, result) => {
//     if (err) {
//       console.error('❌ DB error:', err);
      
//       if (err.code === 'ER_DUP_ENTRY') {
//         return res.status(400).json({ message: 'Email already exists' });
//       }

//       return res.status(500).json({ message: 'Database error', error: err.message });
//     }

//     console.log('✅ New enquiry added:', { name, email, mobile });
//     res.status(200).json({ message: 'Data stored successfully' });
//   });
// });

// app.post('/enroll', (req, res) => {
//   console.log("Request Body:", req.body);

//   const { course_name, name, email, phone, mode, message} = req.body;

  // if (!course_name ||!name || !email || !phone || !mode) {
  //   return res.status(400).json({ message: 'Bad requests' });
  // }

  // Email validation
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   console.log("Email Validation:", emailRegex.test(email)); // Debug log
  //   return res.status(400).json({ message: 'Invalid email format' });
  // }

  // Insert directly - let DB handle duplicates
//   const insertQuery = `
//     INSERT INTO usersEnrollments (course_name, name, email, phone, mode, message)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(insertQuery, [course_name, name, email, phone, mode, message], (err, result) => {
//     if (err) {
//       if (err.code === 'ER_DUP_ENTRY') {
//         return res.status(400).json({ message: 'Email already exists.' });
//       }
//       return res.status(500).json({ message: 'Error inserting enrollment', error: err.message });
//     }

//     res.status(200).json({ message: 'Enrollment successful!' });
//   });
// });




// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const Enquiry = require('../src/Component/Enquiry')
const Enrollment = require('../src/Component/Enrollment');

const app = express();
const PORT = 8080; 

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.post('/register', async (req, res) => {
  const { name, email, mobile } = req.body;
  console.log("/register called with:", req.body);

  try {
    const newEnquiry = new Enquiry({ name, email, mobile });
    await newEnquiry.save();
    res.status(200).json({ message: 'Stored successfully' });
  } catch (err) {

    if (err.code === 11000) {
      console.log("wy erro",err.code);
      console.log("⚠️ Duplicate key error detected (email exists)");

      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'DB error', error: err.message });
  }
});

app.post('/enroll', async (req, res) => {
  const { course_name, name, email, phone, mode, message } = req.body;

  try {
    const newEnrollment = new Enrollment({ course_name, name, email, phone, mode, message });
    await newEnrollment.save();
    res.status(200).json({ message: 'Enrollment saved' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already enrolled' });
    }
    res.status(500).json({ message: 'DB error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
