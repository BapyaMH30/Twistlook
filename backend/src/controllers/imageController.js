const mongoose = require('mongoose');

// @desc    Get image from GridFS
// @route   GET /api/images/:id
// @access  Public
exports.getImage = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });

    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid image ID' });
    }

    // Find file metadata
    const files = await db.collection('fs.files').findOne({ _id: fileId });
    if (!files) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set content type
    res.set('Content-Type', files.contentType || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Stream the file
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('error', (err) => {
      res.status(500).json({ error: 'Error streaming image' });
    });

    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get image metadata
// @route   GET /api/images/:id/info
// @access  Public
exports.getImageInfo = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid image ID' });
    }

    const file = await db.collection('fs.files').findOne({ _id: fileId });
    if (!file) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({
      id: file._id,
      filename: file.filename,
      contentType: file.contentType,
      length: file.length,
      uploadDate: file.uploadDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Upload image to GridFS
// @route   POST /api/images
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      res.status(201).json({
        id: uploadStream.id,
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });
    });

    uploadStream.on('error', (err) => {
      res.status(500).json({ error: 'Error uploading image' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete image from GridFS
// @route   DELETE /api/images/:id
// @access  Private
exports.deleteImage = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });

    let fileId;
    try {
      fileId = new mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid image ID' });
    }

    await bucket.delete(fileId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
