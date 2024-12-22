import mongoose from 'mongoose';

// Schema for links
const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema for topics
const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  links: [linkSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Topic = mongoose.model('Topic', topicSchema);