// routes/upload.js
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const ExcelData = require('../models/ExcelData'); // import model

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!jsonData || jsonData.length === 0) {
      return res.status(400).json({ message: 'Empty Excel file' });
    }

    // Save to MongoDB
    const savedData = new ExcelData({ data: jsonData });
    await savedData.save();

    res.status(200).json({ message: 'File processed and saved to DB', count: jsonData.length });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to process file' });
  }
});

module.exports = router;
