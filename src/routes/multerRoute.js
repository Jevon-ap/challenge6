const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const artworkController = require('../controllers/artworkController');

router.post('/', upload.single('gambar'), (req, res, next) => {
  console.log(req.file); 
  console.log(req.body); 
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  next(); 
}, artworkController.createArtwork);

module.exports = router;