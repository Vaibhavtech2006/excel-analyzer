const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  data: Array // assuming the sheet is converted to JSON array
});

module.exports = mongoose.model('File', fileSchema);
