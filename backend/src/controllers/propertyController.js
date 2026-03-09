const { LandSite, ConstructionSite } = require('../models/Property');

// ==================== LAND SITES ====================

// @desc    Get all land sites
// @route   GET /api/properties/land
// @access  Public
exports.getLandSites = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, minArea, maxArea } = req.query;
    const filter = {};

    // Use UPPERCASE field names for legacy data
    if (city) filter.LOCATION = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      filter.MAX_PRICE = {};
      if (minPrice) filter.MAX_PRICE.$gte = Number(minPrice);
      if (maxPrice) filter.MAX_PRICE.$lte = Number(maxPrice);
    }
    if (minArea || maxArea) {
      filter.AREA = {};
      if (minArea) filter.AREA.$gte = Number(minArea);
      if (maxArea) filter.AREA.$lte = Number(maxArea);
    }

    const properties = await LandSite.find(filter)
      .sort({ _id: -1 })
      .limit(100);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single land site
// @route   GET /api/properties/land/:id
// @access  Public
exports.getLandSiteById = async (req, res) => {
  try {
    const property = await LandSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create land site
// @route   POST /api/properties/land
// @access  Private
exports.createLandSite = async (req, res) => {
  try {
    const property = new LandSite({
      ...req.body,
      POSTED_BY: `${req.user.email || req.user.EMAIL}@LandDealer`,
      DATE: new Date().toISOString().split('T')[0],
      TIME: new Date().toLocaleTimeString()
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update land site
// @route   PUT /api/properties/land/:id
// @access  Private
exports.updateLandSite = async (req, res) => {
  try {
    const property = await LandSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check ownership
    const userEmail = req.user.email || req.user.EMAIL;
    if (!property.POSTED_BY?.includes(userEmail)) {
      return res.status(403).json({ error: 'Not authorized to update this property' });
    }

    const updatedProperty = await LandSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete land site
// @route   DELETE /api/properties/land/:id
// @access  Private
exports.deleteLandSite = async (req, res) => {
  try {
    const property = await LandSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check ownership
    const userEmail = req.user.email || req.user.EMAIL;
    if (!property.POSTED_BY?.includes(userEmail)) {
      return res.status(403).json({ error: 'Not authorized to delete this property' });
    }

    await LandSite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==================== CONSTRUCTION SITES ====================

// @desc    Get all construction sites
// @route   GET /api/properties/construction
// @access  Public
exports.getConstructionSites = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, projectType } = req.query;
    const filter = {};

    // Use UPPERCASE field names for legacy data
    if (city) filter.LOCATION = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      const priceConditions = [];
      if (minPrice) priceConditions.push({ MIN_PRICE: { $gte: Number(minPrice) } });
      if (maxPrice) priceConditions.push({ MAX_PRICE: { $lte: Number(maxPrice) } });
      if (priceConditions.length > 0) filter.$or = priceConditions;
    }

    const properties = await ConstructionSite.find(filter)
      .sort({ _id: -1 })
      .limit(100);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single construction site
// @route   GET /api/properties/construction/:id
// @access  Public
exports.getConstructionSiteById = async (req, res) => {
  try {
    const property = await ConstructionSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create construction site
// @route   POST /api/properties/construction
// @access  Private
exports.createConstructionSite = async (req, res) => {
  try {
    const property = new ConstructionSite({
      ...req.body,
      POSTED_BY: `${req.user.email || req.user.EMAIL}@Constructor`,
      DATE: new Date().toISOString().split('T')[0],
      TIME: new Date().toLocaleTimeString()
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update construction site
// @route   PUT /api/properties/construction/:id
// @access  Private
exports.updateConstructionSite = async (req, res) => {
  try {
    const property = await ConstructionSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check ownership
    const userEmail = req.user.email || req.user.EMAIL;
    if (!property.POSTED_BY?.includes(userEmail)) {
      return res.status(403).json({ error: 'Not authorized to update this property' });
    }

    const updatedProperty = await ConstructionSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete construction site
// @route   DELETE /api/properties/construction/:id
// @access  Private
exports.deleteConstructionSite = async (req, res) => {
  try {
    const property = await ConstructionSite.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check ownership
    const userEmail = req.user.email || req.user.EMAIL;
    if (!property.POSTED_BY?.includes(userEmail)) {
      return res.status(403).json({ error: 'Not authorized to delete this property' });
    }

    await ConstructionSite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==================== SEARCH ====================

// @desc    Search all properties
// @route   GET /api/properties/search
// @access  Public
exports.searchProperties = async (req, res) => {
  try {
    const { q, type, city, minPrice, maxPrice } = req.query;
    let results = [];

    // Search land sites
    if (!type || type === 'land') {
      const landFilter = {};
      if (q) {
        landFilter.$or = [
          { TYPE: new RegExp(q, 'i') },
          { DESCRIPTION: new RegExp(q, 'i') },
          { LOCATION: new RegExp(q, 'i') }
        ];
      }
      if (city) landFilter.LOCATION = new RegExp(city, 'i');
      if (minPrice) landFilter.MAX_PRICE = { ...landFilter.MAX_PRICE, $gte: Number(minPrice) };
      if (maxPrice) landFilter.MAX_PRICE = { ...landFilter.MAX_PRICE, $lte: Number(maxPrice) };

      const landResults = await LandSite.find(landFilter).limit(50);
      results = results.concat(
        landResults.map(p => ({ ...p.toObject(), propertyType: 'land' }))
      );
    }

    // Search construction sites
    if (!type || type === 'construction') {
      const constructionFilter = {};
      if (q) {
        constructionFilter.$or = [
          { NAME: new RegExp(q, 'i') },
          { DESCRIPTION: new RegExp(q, 'i') },
          { LOCATION: new RegExp(q, 'i') },
          { FEATURES: new RegExp(q, 'i') }
        ];
      }
      if (city) constructionFilter.LOCATION = new RegExp(city, 'i');
      if (minPrice) constructionFilter.MIN_PRICE = { $gte: Number(minPrice) };
      if (maxPrice) constructionFilter.MAX_PRICE = { $lte: Number(maxPrice) };

      const constructionResults = await ConstructionSite.find(constructionFilter).limit(50);
      results = results.concat(
        constructionResults.map(p => ({ ...p.toObject(), propertyType: 'construction' }))
      );
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
exports.getFeaturedProperties = async (req, res) => {
  try {
    const landSites = await LandSite.find()
      .sort({ RATING: -1 })
      .limit(4);

    const constructionSites = await ConstructionSite.find()
      .sort({ RATING: -1 })
      .limit(4);

    res.json({
      land: landSites,
      construction: constructionSites
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
