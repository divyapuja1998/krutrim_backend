const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,unique: false},
  mobile: { type: String, required: true },
},{
    timestamps: true // 
  
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
