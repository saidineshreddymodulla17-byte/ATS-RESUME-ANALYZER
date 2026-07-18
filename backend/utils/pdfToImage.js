const fs = require('fs')
const os = require('os')
const path = require('path')
const pdfPoppler = require('pdf-poppler')

const convertPdfPageToImage = async pdfBuffer => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'resume-'),
  )

  const pdfPath = path.join(tempDir, 'resume.pdf')

  fs.writeFileSync(pdfPath, pdfBuffer)

  const options = {
    format: 'png',
    out_dir: tempDir,
    out_prefix: 'page',
    page: 1,
  }

  await pdfPoppler.convert(pdfPath, options)

  const imagePath = path.join(tempDir, 'page-1.png')

  const imageBuffer = fs.readFileSync(imagePath)

  fs.rmSync(tempDir, {
    recursive: true,
    force: true,
  })

  return imageBuffer
}

module.exports = {
  convertPdfPageToImage,
}