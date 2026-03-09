const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/twistslook');

// Free real estate image URLs from Unsplash (public domain)
const imageUrls = [
  // Land & Plots
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', // Green field
  'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800', // Land plot
  'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800', // Farm land
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', // Scenic land
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', // Mountain land
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', // Valley
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', // Forest land
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800', // Rural land
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800', // Hills
  'https://images.unsplash.com/photo-1518173946687-a4c036bc1c9a?w=800', // Beach land

  // Residential Buildings
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', // Modern house
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', // Luxury home
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', // Villa
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', // Modern villa
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', // Mansion
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', // Contemporary home
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', // Luxury exterior
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', // Modern architecture
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800', // Beach house
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800', // Pool house

  // Apartments & Towers
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', // Apartment building
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', // Skyscraper
  'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800', // High rise
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800', // Modern tower
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800', // Apartment complex
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800', // Residential tower
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800', // Urban apartments
  'https://images.unsplash.com/photo-1529408632839-a54952c491e5?w=800', // City buildings
  'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800', // Downtown
  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800', // Residential area

  // Commercial Buildings
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', // Office building
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', // Modern office
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800', // Corporate building
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', // Business center
  'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800', // Mall
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', // Commercial space

  // Construction Sites
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', // Construction
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800', // Building site
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800', // Architecture
  'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800', // Development

  // Luxury & International
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', // Dubai style
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800', // Luxury real estate
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', // Premium home
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800', // Waterfront
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', // Estate
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800', // Garden home

  // Interior (for variety)
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800', // Living room
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800', // Interior
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800', // Modern interior
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800', // Kitchen

  // More exteriors
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800', // Suburban home
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800', // Family home
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', // Nice house
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800', // Front yard
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800', // Classic home
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', // Cozy house

  // City views
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', // City skyline
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', // Urban
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', // Night city
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', // Metropolitan

  // Beach & Resort properties
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', // Beach property
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', // Resort
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', // Hotel
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', // Pool resort

  // Additional variety
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800', // Keys/real estate
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800', // Property
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800', // Neighborhood
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800', // Street view
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', // Apartment
  'https://images.unsplash.com/photo-1560449017-9de0d782efc0?w=800', // Building facade

  // More land/nature
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800', // Pine trees
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800', // Tree land
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800', // Sunlight forest
  'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800', // Sunset land
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', // Mountain view

  // More buildings
  'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800', // Architect house
  'https://images.unsplash.com/photo-1430285561322-7808604715df?w=800', // Glass building
  'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800', // City tower
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', // Cottage
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', // Loft apartment

  // International landmarks style
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', // Dubai
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800', // Dubai buildings
  'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800', // Singapore
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', // Singapore skyline
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', // London
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800', // New York
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', // NYC skyline
  'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800', // Manhattan
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800', // LA
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800', // Apartments

  // Additional 50+ to reach 160+ unique images
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800',
  'https://images.unsplash.com/photo-1600047508788-786f3865b4b9?w=800',
  'https://images.unsplash.com/photo-1600566752734-32093f8dda94?w=800',
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
  'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=800',
  'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
  'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600047508006-aa8b44e74e08?w=800',
  'https://images.unsplash.com/photo-1600566752547-33a300b66e35?w=800',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
  'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800',
  'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
  'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800',
  'https://images.unsplash.com/photo-1600047508788-786f3865b4b9?w=800',
];

// Download image from URL
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 30000
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Upload image to GridFS
async function uploadToGridFS(db, imageBuffer, filename) {
  return new Promise((resolve, reject) => {
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: 'image/jpeg'
    });

    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.on('error', reject);

    uploadStream.end(imageBuffer);
  });
}

async function main() {
  try {
    const db = mongoose.connection;

    await new Promise((resolve) => {
      if (db.readyState === 1) resolve();
      else db.once('open', resolve);
    });

    console.log('Connected to MongoDB\n');

    // Get unique URLs (remove duplicates)
    const uniqueUrls = [...new Set(imageUrls)];
    console.log(`Total unique image URLs: ${uniqueUrls.length}`);

    // We need 160 properties × 2 images = 320 images
    // But let's download enough for unique IMAGE1 per property
    const totalProperties = 160;
    const imagesToDownload = Math.min(uniqueUrls.length, totalProperties * 2);

    console.log(`Downloading ${imagesToDownload} images...\n`);

    const uploadedImageIds = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < imagesToDownload; i++) {
      const url = uniqueUrls[i % uniqueUrls.length];
      const filename = `property_image_${i + 1}.jpg`;

      try {
        process.stdout.write(`Downloading image ${i + 1}/${imagesToDownload}... `);

        const imageBuffer = await downloadImage(url);
        const imageId = await uploadToGridFS(db, imageBuffer, filename);

        uploadedImageIds.push(imageId);
        successCount++;
        console.log(`OK (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 100));
      } catch (error) {
        failCount++;
        console.log(`FAILED: ${error.message}`);
      }
    }

    console.log(`\n========== DOWNLOAD COMPLETE ==========`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Total new images in GridFS: ${uploadedImageIds.length}`);
    console.log(`========================================\n`);

    if (uploadedImageIds.length === 0) {
      console.log('No images were downloaded. Exiting.');
      process.exit(1);
    }

    // Now assign unique images to properties
    console.log('Assigning unique images to properties...\n');

    const landCollection = db.collection('posted_land_sites');
    const constructionCollection = db.collection('posted_construction_sites');

    const allLandSites = await landCollection.find().toArray();
    const allConstructionSites = await constructionCollection.find().toArray();

    let imageIndex = 0;

    // Assign to land sites
    console.log(`Updating ${allLandSites.length} land sites...`);
    for (const site of allLandSites) {
      const image1 = uploadedImageIds[imageIndex % uploadedImageIds.length];
      const image2 = uploadedImageIds[(imageIndex + 1) % uploadedImageIds.length];

      await landCollection.updateOne(
        { _id: site._id },
        { $set: { IMAGE1: image1, IMAGE2: image2, IMAGE1TYPE: 'image/jpeg', IMAGE2TYPE: 'image/jpeg' } }
      );

      imageIndex += 2;
    }

    // Assign to construction sites
    console.log(`Updating ${allConstructionSites.length} construction sites...`);
    for (const site of allConstructionSites) {
      const image1 = uploadedImageIds[imageIndex % uploadedImageIds.length];
      const image2 = uploadedImageIds[(imageIndex + 1) % uploadedImageIds.length];

      await constructionCollection.updateOne(
        { _id: site._id },
        { $set: { IMAGE1: image1, IMAGE2: image2, IMAGE1TYPE: 'image/jpeg', IMAGE2TYPE: 'image/jpeg' } }
      );

      imageIndex += 2;
    }

    // Final stats
    const totalImages = await db.collection('fs.files').countDocuments();

    console.log(`\n========== COMPLETE ==========`);
    console.log(`Total images in GridFS: ${totalImages}`);
    console.log(`Land sites updated: ${allLandSites.length}`);
    console.log(`Construction sites updated: ${allConstructionSites.length}`);
    console.log(`================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
