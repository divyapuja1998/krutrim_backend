const connectDB = require('../db');
const Enrollment = require('../Enrollment');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed');
  }

  const { course_name, name, email, phone, mode, message } = req.body;

  await connectDB();

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
};