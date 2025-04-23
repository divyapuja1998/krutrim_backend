const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  course_name: String,
  name: String,
  email: { type: String, unique: true },
  phone: String,
  mode: String,
  message: String,
},

  {
    timestamps: true // 

});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
