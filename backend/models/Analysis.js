const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    resumeName: {
      type: String,
      required: true,
      trim: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    keywordMatch: {
      type: Number,
      required: true,
    },

    // NEW
    resumeQuality: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    // NEW
    suggestions: {
      type: [String],
      default: [],
    },

    totalMatchedSkills: {
      type: Number,
      default: 0,
    },

    totalMissingSkills: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Analysis = mongoose.model('Analysis', analysisSchema)

module.exports = Analysis