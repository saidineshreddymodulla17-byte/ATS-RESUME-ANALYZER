const {createCanvas} = require('canvas')

const convertPdfPageToImage = async pdfBuffer => {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

  pdfjsLib.GlobalWorkerOptions.workerSrc = null

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(pdfBuffer),
  })

  const pdf = await loadingTask.promise

  const page = await pdf.getPage(1)

  const viewport = page.getViewport({
    scale: 2,
  })

  const canvas = createCanvas(viewport.width, viewport.height)

  const context = canvas.getContext('2d')

  await page.render({
    canvasContext: context,
    viewport,
  }).promise

  return canvas.toBuffer('image/png')
}

module.exports = {
  convertPdfPageToImage,
}