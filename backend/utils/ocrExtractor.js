const {createWorker} = require('tesseract.js')

const extractTextUsingOCR = async imageBuffer => {
  let worker

  try {
    console.log('\n========== OCR STARTED ==========')
    console.log('Starting Tesseract OCR...')

    worker = await createWorker('eng')

    const result = await worker.recognize(imageBuffer)

    const extractedText = result.data.text.trim()

    console.log('OCR completed successfully')
    console.log('OCR extracted characters:', extractedText.length)

    return extractedText
  } catch (error) {
    console.error('OCR extraction error:', error)
    throw error
  } finally {
    if (worker) {
      await worker.terminate()
    }
  }
}

module.exports = {
  extractTextUsingOCR,
}