const {PDFParse} = require('pdf-parse')

console.log('✅ resumeController loaded')

const Analysis = require('../models/Analysis')

const {
  analyzeResumeWithAI,
} = require('../utils/aiAnalyzer')

const {
  extractTextUsingOCR,
} = require('../utils/ocrExtractor')

const {
  convertPdfPageToImage,
} = require('../utils/pdfToImage')

// =======================================================
// Upload Resume
// =======================================================

const uploadResume = async (req, res) => {
  console.log('🚀 uploadResume function called')

  let parser

  try {
    console.log('\n==========================================')
    console.log('NEW AI RESUME ANALYSIS REQUEST RECEIVED')
    console.log('Time:', new Date().toLocaleString())
    console.log('==========================================\n')

    // =====================================================
    // STEP 1: Validate uploaded file
    // =====================================================

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

    // =====================================================
    // STEP 2: Extract Resume Text
    // =====================================================

    let resumeText = ''
    let extractionMethod = 'pdf-parse'

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
      console.log('Trying OCR fallback...')
      resumeText = ''
    }

    // =====================================================
    // STEP 3: OCR FALLBACK
    // =====================================================

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

        resumeText = await extractTextUsingOCR(
          imageBuffer,
        )

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
        })
      }
    }

    // =====================================================
    // STEP 4: Validate Extracted Text
    // =====================================================

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        message: 'Could not extract text from resume.',
      })
    }

    console.log(
      '\nResume text extraction completed.',
    )

    console.log(
      'Extraction Method:',
      extractionMethod,
    )

    // =====================================================
    // STEP 5: Gemini AI Analysis
    // =====================================================

    console.log('\n==========================================')
    console.log('🤖 RUNNING GEMINI AI ANALYSIS')
    console.log('==========================================\n')

    const aiAnalysis = await analyzeResumeWithAI(
      resumeText,
      jobDescription,
    )

    console.log('✅ AI analysis completed')

    console.log(
      'Semantic Score:',
      aiAnalysis.semanticScore,
    )

    // =====================================================
    // STEP 6: Save AI Analysis to MongoDB
    // =====================================================

    console.log('\nSaving AI analysis to MongoDB...\n')

    const savedAnalysis = await Analysis.create({
      user: req.user._id,

      resumeName: req.file.originalname,

      resumeText,

      jobDescription,

      // -----------------------------------------------
      // Gemini AI Results
      // -----------------------------------------------

      aiAnalysis: {
        semanticScore: aiAnalysis.semanticScore,

        summary: aiAnalysis.summary,

        strengths: aiAnalysis.strengths,

        weaknesses: aiAnalysis.weaknesses,

        skillGaps: aiAnalysis.skillGaps,

        suggestions: aiAnalysis.suggestions,
      },
    })

    console.log(
      '✅ AI Analysis Saved Successfully',
    )

    console.log(
      'Analysis ID:',
      savedAnalysis._id,
    )

    // =====================================================
    // STEP 7: Send Response to Frontend
    // =====================================================

    res.status(200).json({
      message: 'Resume analyzed successfully',

      analysisId: savedAnalysis._id,

      extractionMethod,

      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },

      // Gemini AI analysis only
      aiAnalysis,
    })
  } catch (error) {
    console.error(
      '\n❌ AI Resume Analysis Error:',
      error,
    )

    res.status(500).json({
      message:
        'Server error while processing resume',

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
        'resumeName aiAnalysis createdAt',
      )

    res.status(200).json(analyses)
  } catch (error) {
    console.error('History Error:', error)

    res.status(500).json({
      message:
        'Server error while fetching history',
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
    console.error(
      'Get Analysis Error:',
      error,
    )

    res.status(500).json({
      message:
        'Server error while fetching analysis',
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

    await Analysis.findByIdAndDelete(
      req.params.id,
    )

    res.status(200).json({
      message:
        'Analysis deleted successfully',
    })
  } catch (error) {
    console.error(
      'Delete Error:',
      error,
    )

    res.status(500).json({
      message:
        'Server error while deleting analysis',
    })
  }
}

// =======================================================
// Export Controllers
// =======================================================

module.exports = {
  uploadResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
}