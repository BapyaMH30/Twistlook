const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/twistslook');

async function assignImages() {
  try {
    const db = mongoose.connection;

    await new Promise((resolve) => {
      if (db.readyState === 1) resolve();
      else db.once('open', resolve);
    });

    console.log('Connected to MongoDB');

    // Get all image IDs from GridFS
    const images = await db.collection('fs.files').find().toArray();
    const imageIds = images.map(img => img._id);

    console.log(`Found ${imageIds.length} images in GridFS`);

    if (imageIds.length === 0) {
      console.log('No images found. Exiting.');
      process.exit(0);
    }

    // Helper to get random image ID
    const getRandomImage = () => imageIds[Math.floor(Math.random() * imageIds.length)];

    // Update land sites without images
    const landCollection = db.collection('posted_land_sites');
    const landSitesWithoutImages = await landCollection.find({
      $or: [
        { IMAGE1: null },
        { IMAGE1: { $exists: false } }
      ]
    }).toArray();

    console.log(`\nUpdating ${landSitesWithoutImages.length} land sites with images...`);

    for (const site of landSitesWithoutImages) {
      await landCollection.updateOne(
        { _id: site._id },
        {
          $set: {
            IMAGE1: getRandomImage(),
            IMAGE2: getRandomImage(),
            IMAGE1TYPE: 'image/jpg',
            IMAGE2TYPE: 'image/jpg'
          }
        }
      );
    }

    console.log(`Updated ${landSitesWithoutImages.length} land sites`);

    // Update construction sites without images
    const constructionCollection = db.collection('posted_construction_sites');
    const constructionSitesWithoutImages = await constructionCollection.find({
      $or: [
        { IMAGE1: null },
        { IMAGE1: { $exists: false } }
      ]
    }).toArray();

    console.log(`\nUpdating ${constructionSitesWithoutImages.length} construction sites with images...`);

    for (const site of constructionSitesWithoutImages) {
      await constructionCollection.updateOne(
        { _id: site._id },
        {
          $set: {
            IMAGE1: getRandomImage(),
            IMAGE2: getRandomImage(),
            IMAGE1TYPE: 'image/jpg',
            IMAGE2TYPE: 'image/jpg'
          }
        }
      );
    }

    console.log(`Updated ${constructionSitesWithoutImages.length} construction sites`);

    // Verify
    const landWithImages = await landCollection.countDocuments({ IMAGE1: { $ne: null } });
    const constructionWithImages = await constructionCollection.countDocuments({ IMAGE1: { $ne: null } });

    console.log('\n========== COMPLETE ==========');
    console.log(`Land sites with images: ${landWithImages}`);
    console.log(`Construction sites with images: ${constructionWithImages}`);
    console.log('================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

assignImages();
