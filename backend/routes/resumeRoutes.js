const express = require('express')

const upload = require('../middleware/uploadMiddleware')
const protect = require('../middleware/authMiddleware')

const {
  uploadResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/resumeController')

const router = express.Router()

// Upload Resume
router.post(
  '/upload',
  protect,
  upload.single('resume'),
  uploadResume,
)

// Get Analysis History
router.get(
  '/history',
  protect,
  getAnalysisHistory,
)

// Get Single Analysis
router.get(
  '/:id',
  protect,
  getAnalysisById,
)

// Delete Analysis
router.delete(
  '/:id',
  protect,
  deleteAnalysis,
)

module.exports = router