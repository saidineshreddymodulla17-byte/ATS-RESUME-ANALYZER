const {GoogleGenAI, Type} = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const analyzeResumeWithAI = async (
  resumeText,
  jobDescription,
) => {
  console.log('\n==========================================')
  console.log('🤖 GEMINI AI ANALYSIS STARTED')
  console.log('==========================================')

  console.log('📄 Resume characters:', resumeText.length)
  console.log('💼 Job description characters:', jobDescription.length)
  console.log('🔑 Gemini API key loaded:', !!process.env.GEMINI_API_KEY)
  console.log('🚀 Calling Gemini API...')

  const prompt = `
You are an expert AI-powered resume and recruitment analyst.

Analyze the candidate's resume against the provided job description.

Your analysis must be based ONLY on the information present in the resume
and job description. Do not invent skills, experience, education, projects,
or achievements that are not present.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze:

1. How well the candidate's experience and skills align with the job.
2. The candidate's strongest relevant skills and experience.
3. Important weaknesses or areas that could be improved.
4. Skills or technologies mentioned in the job description that are not
   clearly demonstrated in the resume.
5. Specific, practical recommendations for improving the resume for this
   particular job.
6. Give a semantic match score from 0 to 100 based on overall relevance
   between the resume and job description.

Return the result using the requested JSON structure.
`

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',

      contents: prompt,

      config: {
        responseMimeType: 'application/json',

        responseSchema: {
          type: Type.OBJECT,

          properties: {
            semanticScore: {
              type: Type.INTEGER,
              description:
                'Overall semantic match score from 0 to 100.',
            },

            summary: {
              type: Type.STRING,
              description:
                'A concise summary of how well the resume matches the job description.',
            },

            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description:
                'Important strengths of the candidate relevant to the job.',
            },

            weaknesses: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description:
                'Important weaknesses or areas where the resume could be improved.',
            },

            skillGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description:
                'Important skills or technologies required by the job but not clearly demonstrated in the resume.',
            },

            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description:
                'Specific and practical resume improvement recommendations.',
            },
          },

          required: [
            'semanticScore',
            'summary',
            'strengths',
            'weaknesses',
            'skillGaps',
            'suggestions',
          ],
        },
      },
    })

    console.log('✅ Gemini API response received')

    const aiAnalysis = JSON.parse(response.text)

    console.log('📊 Gemini Semantic Score:', aiAnalysis.semanticScore)
    console.log('💪 Strengths:', aiAnalysis.strengths.length)
    console.log('⚠️ Weaknesses:', aiAnalysis.weaknesses.length)
    console.log('🎯 Skill Gaps:', aiAnalysis.skillGaps.length)
    console.log('💡 AI Suggestions:', aiAnalysis.suggestions.length)

    console.log('==========================================')
    console.log('✅ GEMINI AI ANALYSIS COMPLETED')
    console.log('==========================================\n')

    return aiAnalysis
  } catch (error) {
    console.error('\n❌ GEMINI API ERROR')
    console.error('Error message:', error.message)
    console.error('==========================================\n')

    throw error
  }
}

module.exports = {
  analyzeResumeWithAI,
}