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
// const mongoose = require('mongoose');

// const uri = 'mongodb+srv://root:root@cluster0.4szw5s3.mongodb.net/krutrimedu?retryWrites=true&w=majority&appName=Cluster0';

// const db = async () => {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };
// module.exports = db;
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('Please define the MONGO_URI environment variable');
    }

    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
