const express = require('express');
const {
  getLandSites,
  getLandSiteById,
  createLandSite,
  updateLandSite,
  deleteLandSite,
  getConstructionSites,
  getConstructionSiteById,
  createConstructionSite,
  updateConstructionSite,
  deleteConstructionSite,
  searchProperties,
  getFeaturedProperties
} = require('../controllers/propertyController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Featured properties
router.get('/featured', getFeaturedProperties);

// Search
router.get('/search', searchProperties);

// Land sites
router.get('/land', getLandSites);
router.get('/land/:id', getLandSiteById);
router.post('/land', auth, createLandSite);
router.put('/land/:id', auth, updateLandSite);
router.delete('/land/:id', auth, deleteLandSite);

// Construction sites
router.get('/construction', getConstructionSites);
router.get('/construction/:id', getConstructionSiteById);
router.post('/construction', auth, createConstructionSite);
router.put('/construction/:id', auth, updateConstructionSite);
router.delete('/construction/:id', auth, deleteConstructionSite);

module.exports = router;
