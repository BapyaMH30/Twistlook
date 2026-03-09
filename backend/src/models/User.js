const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema matches existing database structure
const userSchema = new mongoose.Schema({
  // Existing DB fields (uppercase)
  ID: String,
  TYPE: String,
  NAME: String,
  EMAIL: String,
  PASSWORD: String,
  MOBILE: String,
  LOCATION: String,
  GROUP_NAME: String,
  URATE: Number,
  TIME: String,
  DATE: String,
  // New user fields (lowercase for new registrations)
  name: String,
  email: { type: String, sparse: true },
  password: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  profileImage: String,
  role: { type: String, enum: ['user', 'admin', 'Constructor', 'LandDealer'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

// Virtual for unified name access
userSchema.virtual('displayName').get(function() {
  return this.name || this.NAME;
});

userSchema.virtual('displayEmail').get(function() {
  return this.email || this.EMAIL;
});

userSchema.virtual('displayPhone').get(function() {
  return this.phone || this.MOBILE;
});

userSchema.virtual('displayLocation').get(function() {
  return this.city || this.LOCATION;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  // Only hash if it's a new-style password (not from legacy DB)
  if (this.password && this.password.length < 50) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  // Check both legacy PASSWORD and new password field
  const storedPassword = this.password || this.PASSWORD;
  if (!storedPassword) return false;

  // Legacy passwords are plain text
  if (storedPassword === candidatePassword) return true;

  // New passwords are hashed
  try {
    return await bcrypt.compare(candidatePassword, storedPassword);
  } catch {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema, 'user');
