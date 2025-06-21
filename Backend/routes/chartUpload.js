const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json(data); // return data to frontend
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse Excel file' });
  }
});

module.exports = router;
