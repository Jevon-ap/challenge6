const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'upload');
    },
    filename: function(req, file, cb) {
      try {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      } catch (error) {
        console.error(error);
        cb(error, null);
      }
    }
  });

const upload = multer({ storage: storage });

module.exports = upload;