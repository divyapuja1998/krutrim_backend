const connectDB = require('../db');
const Enquiry = require('../Enquiry');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { name, email, mobile } = req.body;
  await connectDB();

  try {
    const newEnquiry = new Enquiry({ name, email, mobile });
    await newEnquiry.save();
    res.status(200).json({ message: 'Stored successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};