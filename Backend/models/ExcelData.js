const mongoose = require('mongoose');

const excelSchema = new mongoose.Schema({
  data: [{}], // flexible structure
}, { timestamps: true });

module.exports = mongoose.model('ExcelData', excelSchema);
