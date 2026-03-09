const mongoose = require('mongoose');

// Schema matches existing database structure with UPPERCASE fields
const landSiteSchema = new mongoose.Schema({
  POSTED_BY: String,
  ID: String,
  TIME: String,
  DATE: String,
  TYPE: String,
  LOCATION: String,
  POSSESSION_DATE: String,
  MAX_PRICE: Number,
  AREA: Number,
  DESCRIPTION: String,
  FREEHOLD: String,
  OWNER_FIRST_NAME: String,
  OWNER_LAST_NAME: String,
  OWNER_EMAIL: String,
  OWNER_MOBILE: String,
  OWNER_LOCATION: String,
  IMAGE1: mongoose.Schema.Types.ObjectId,
  IMAGE2: mongoose.Schema.Types.ObjectId,
  IMAGE1TYPE: String,
  IMAGE2TYPE: String,
  RATING: { type: Number, default: 0 }
}, { strict: false });

// Virtual getters for normalized access
landSiteSchema.virtual('title').get(function() {
  return this.TYPE || 'Land Site';
});
landSiteSchema.virtual('price').get(function() {
  return this.MAX_PRICE;
});
landSiteSchema.virtual('area').get(function() {
  return this.AREA;
});
landSiteSchema.virtual('location').get(function() {
  return this.LOCATION;
});
landSiteSchema.virtual('description').get(function() {
  return this.DESCRIPTION;
});
landSiteSchema.virtual('images').get(function() {
  return [this.IMAGE1, this.IMAGE2].filter(Boolean);
});
landSiteSchema.set('toJSON', { virtuals: true });
landSiteSchema.set('toObject', { virtuals: true });

const constructionSiteSchema = new mongoose.Schema({
  POSTED_BY: String,
  ID: String,
  TIME: String,
  DATE: String,
  NAME: String,
  LOCATION: String,
  START_DATE: String,
  END_DATE: String,
  MIN_PRICE: Number,
  MAX_PRICE: Number,
  AREA: Number,
  FEATURES: String,
  IMAGE1: mongoose.Schema.Types.ObjectId,
  IMAGE2: mongoose.Schema.Types.ObjectId,
  IMAGE1TYPE: String,
  IMAGE2TYPE: String,
  DESCRIPTION: String,
  RATING: { type: Number, default: 0 }
}, { strict: false });

// Virtual getters for normalized access
constructionSiteSchema.virtual('title').get(function() {
  return this.NAME;
});
constructionSiteSchema.virtual('price').get(function() {
  return this.MIN_PRICE || this.MAX_PRICE;
});
constructionSiteSchema.virtual('maxPrice').get(function() {
  return this.MAX_PRICE;
});
constructionSiteSchema.virtual('area').get(function() {
  return this.AREA;
});
constructionSiteSchema.virtual('location').get(function() {
  return this.LOCATION;
});
constructionSiteSchema.virtual('description').get(function() {
  return this.DESCRIPTION;
});
constructionSiteSchema.virtual('features').get(function() {
  return this.FEATURES ? this.FEATURES.split(', ') : [];
});
constructionSiteSchema.virtual('images').get(function() {
  return [this.IMAGE1, this.IMAGE2].filter(Boolean);
});
constructionSiteSchema.virtual('startDate').get(function() {
  return this.START_DATE;
});
constructionSiteSchema.virtual('endDate').get(function() {
  return this.END_DATE;
});
constructionSiteSchema.set('toJSON', { virtuals: true });
constructionSiteSchema.set('toObject', { virtuals: true });

const LandSite = mongoose.model('LandSite', landSiteSchema, 'posted_land_sites');
const ConstructionSite = mongoose.model('ConstructionSite', constructionSiteSchema, 'posted_construction_sites');

module.exports = { LandSite, ConstructionSite };
