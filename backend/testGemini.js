require('dotenv').config()

const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
  model: 'gemini-3.5-flash-lite',
  contents: 'Explain what an ATS resume analyzer does in one sentence.',
})

    console.log('\nGemini Response:')
    console.log(response.text)
  } catch (error) {
    console.error('\nGemini Error:')
    console.error(error)
  }
}

testGemini()