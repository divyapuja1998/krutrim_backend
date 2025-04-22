// backend/db.js
// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',         // update as needed
//   database: 'krutrimedu',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//   } else {
//     console.log('Connected to MySQL DB');
//   }
// });

// module.exports = db;
// db.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://root:root@cluster0.4szw5s3.mongodb.net/krutrimedu?retryWrites=true&w=majority&appName=Cluster0';

const db = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = db;
