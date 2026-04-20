const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Full name is required'], trim: true },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Mobile number must be 10 digits starting with 6-9']
  },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  village: { type: String, required: [true, 'Village/Town is required'], trim: true },
  state: { type: String, required: [true, 'State is required'], trim: true },
  language: { type: String, enum: ['en', 'hi'], default: 'en' },
  trustScore: { type: Number, default: 72, min: 0, max: 100 },
  earningsThisMonth: { type: Number, default: 0 },
  skills: [{
    skillName: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
    proofImage: String,
    addedAt: { type: Date, default: Date.now }
  }],
  badges: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
