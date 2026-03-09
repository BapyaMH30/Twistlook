const express = require('express');
const multer = require('multer');
const {
  getImage,
  getImageInfo,
  uploadImage,
  deleteImage
} = require('../controllers/imageController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

router.get('/:id', getImage);
router.get('/:id/info', getImageInfo);
router.post('/', auth, upload.single('image'), uploadImage);
router.delete('/:id', auth, deleteImage);

module.exports = router;
