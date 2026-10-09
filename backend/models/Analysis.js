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

    // =====================================================
    // Gemini AI Resume Analysis
    // =====================================================

    aiAnalysis: {
      semanticScore: {
        type: Number,
        default: 0,
      },

      summary: {
        type: String,
        default: '',
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      skillGaps: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  },
)

const Analysis = mongoose.model('Analysis', analysisSchema)

module.exports = Analysis