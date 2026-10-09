require('dotenv').config()

const {
  analyzeResumeWithAI,
} = require('./utils/aiAnalyzer')

const resumeText = `
Sai is a software developer with experience in JavaScript,
React, Node.js, Express.js and MongoDB.

He developed full-stack web applications using React and Node.js.
He has experience with REST APIs, JWT authentication and GitHub.
`

const jobDescription = `
We are looking for a Software Engineer with experience in
JavaScript, React, Node.js, MongoDB and AWS.

The candidate should have experience building REST APIs,
working with databases and developing full-stack applications.
`

async function testAI() {
  try {
    const result = await analyzeResumeWithAI(
      resumeText,
      jobDescription,
    )

    console.log('\n========== AI ANALYSIS ==========\n')

    console.log(
      JSON.stringify(result, null, 2),
    )

    console.log('\n=================================\n')
  } catch (error) {
    console.error('Test failed:', error.message)
  }
}

testAI()