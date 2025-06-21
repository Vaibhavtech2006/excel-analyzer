const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const File = require('../models/File');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const newFile = new File({
      name: req.file.originalname,
      data: jsonData
    });

    await newFile.save();
    fs.unlinkSync(req.file.path); // cleanup uploaded file

    res.status(201).json({ message: 'File saved to DB' });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const files = await File.find().select('_id name');
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file.data);
  } catch (err) {
    res.status(500).json({ error: 'Load failed' });
  }
});

module.exports = router;
