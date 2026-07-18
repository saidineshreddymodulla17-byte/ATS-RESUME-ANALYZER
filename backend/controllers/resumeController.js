const {PDFParse} = require('pdf-parse')

console.log("✅ resumeController loaded");

const Analysis = require('../models/Analysis')


const {analyzeResume} = require('../utils/atsAnalyzer')
const {extractTextUsingOCR} = require('../utils/ocrExtractor')
const {convertPdfPageToImage} = require('../utils/pdfToImage')

// =======================================================
// Upload Resume
// =======================================================

const uploadResume = async (req, res) => {
 
    console.log("🚀 uploadResume function called");
  let parser
  

  try {
    console.log('\n==========================================')
    console.log('NEW RESUME ANALYSIS REQUEST RECEIVED')
    console.log('Time:', new Date().toLocaleString())
    console.log('==========================================\n')

    if (!req.file) {
      return res.status(400).json({
        message: 'Please upload a resume PDF',
      })
    }

    console.log('PDF received:', req.file.originalname)

    const {jobDescription} = req.body

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: 'Please provide a job description',
      })
    }

    let resumeText = ''
    let extractionMethod = 'pdf-parse'

    // ==========================================
    // STEP 1 : NORMAL PDF EXTRACTION
    // ==========================================

    try {
      parser = new PDFParse({
        data: req.file.buffer,
      })

      const result = await parser.getText()

      resumeText = result.text.trim()

      console.log(
        'Normal Extraction Characters:',
        resumeText.length,
      )
    } catch (error) {
      console.log('Normal extraction failed')
      resumeText = ''
    }

    // ==========================================
    // STEP 2 : OCR FALLBACK
    // ==========================================

   // ==========================================
// STEP 2 : OCR FALLBACK
// ==========================================

if (!resumeText || resumeText.length < 50) {
  extractionMethod = 'ocr'

  console.log('\n===================================')
  console.log('OCR FALLBACK STARTED')
  console.log('===================================\n')

  try {
    console.log('Step 1: Converting PDF to Image...')

    const imageBuffer = await convertPdfPageToImage(
      req.file.buffer,
    )

    console.log('✅ Step 1 Complete')
    console.log('Image Size:', imageBuffer.length)

    console.log('\nStep 2: Running OCR...')

    resumeText = await extractTextUsingOCR(imageBuffer)

    console.log('✅ Step 2 Complete')
    console.log(
      'OCR Characters Extracted:',
      resumeText.length,
    )
  } catch (error) {
    console.error('\n❌ OCR PIPELINE FAILED')
    console.error(error)

    return res.status(500).json({
      message: 'OCR failed',
      error: error.message,
      stack: error.stack,
    })
  }
}
    // ==========================================
    // STEP 3 : VALIDATION
    // ==========================================

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        message: 'Could not extract text from resume.',
      })
    }

    // ==========================================
    // STEP 4 : ATS ANALYSIS
    // ==========================================

    const analysis = analyzeResume(
      resumeText,
      jobDescription,
    )

    // ==========================================
    // STEP 5 : SAVE TO DATABASE
    // ==========================================

    console.log('\nSaving analysis to MongoDB...\n')

    const savedAnalysis = await Analysis.create({
  user: req.user._id,

  resumeName: req.file.originalname,

  resumeText,

  jobDescription,

  atsScore: analysis.atsScore,

  keywordMatch: analysis.keywordMatch,

  resumeQuality: analysis.resumeQuality,

  matchedSkills: analysis.matchedSkills,

  missingSkills: analysis.missingSkills,

  suggestions: analysis.suggestions,

  totalMatchedSkills:
    analysis.totalMatchedSkills,

  totalMissingSkills:
    analysis.totalMissingSkills,
})
    console.log('Analysis Saved Successfully')
    console.log('Analysis ID:', savedAnalysis._id)

    // ==========================================
    // STEP 6 : RESPONSE
    // ==========================================

    res.status(200).json({
      message: 'Resume analyzed successfully',

      analysisId: savedAnalysis._id,

      extractionMethod,

      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },

      analysis,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error while processing resume',
      error: error.message,
    })
  } finally {
    if (parser) {
      try {
        await parser.destroy()
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

// =======================================================
// Get Analysis History
// =======================================================

const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    })
      .sort({createdAt: -1})
     .select(
  'resumeName atsScore keywordMatch resumeQuality totalMatchedSkills totalMissingSkills createdAt',
)
    res.status(200).json(analyses)
  } catch (error) {
    console.error('History Error:', error)

    res.status(500).json({
      message: 'Server error while fetching history',
    })
  }
}

// =======================================================
// Get Single Analysis
// =======================================================

const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!analysis) {
      return res.status(404).json({
        message: 'Analysis not found',
      })
    }

    res.status(200).json(analysis)
  } catch (error) {
    console.error('Get Analysis Error:', error)

    res.status(500).json({
      message: 'Server error while fetching analysis',
    })
  }
}

// =======================================================
// Delete Analysis
// =======================================================

const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!analysis) {
      return res.status(404).json({
        message: 'Analysis not found',
      })
    }

    await Analysis.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: 'Analysis deleted successfully',
    })
  } catch (error) {
    console.error('Delete Error:', error)

    res.status(500).json({
      message: 'Server error while deleting analysis',
    })
  }
}

module.exports = {
  uploadResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
}