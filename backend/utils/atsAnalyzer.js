// List of technical skills our ATS analyzer can recognize
const skillDatabase = [
  // Programming languages
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Kotlin',
  'Swift',

  // Frontend
  'React',
  'React.js',
  'Angular',
  'Vue.js',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Bootstrap',
  'Redux',
  'Next.js',

  // Backend
  'Node.js',
  'Express.js',
  'Django',
  'Flask',
  'FastAPI',
  'Spring Boot',

  // Databases
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'SQLite',
  'SQL',
  'Redis',

  // APIs and Authentication
  'REST API',
  'REST APIs',
  'JWT',
  'OAuth',

  // Cloud & DevOps
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Jenkins',
  'GitHub Actions',

  // Version Control
  'Git',
  'GitHub',
  'GitLab',

  // AI / ML
  'Machine Learning',
  'Artificial Intelligence',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Pandas',
  'NumPy',

  // CS Fundamentals
  'Data Structures',
  'Algorithms',
  'Data Structures and Algorithms',
  'OOP',
  'Operating Systems',
  'DBMS',
  'Computer Networks',

  // Testing
  'Postman',
  'Jest',
  'Selenium',
  'Robot Framework',
]

// Skill aliases
const skillAliases = {
  React: ['React', 'React.js', 'ReactJS'],
  'Node.js': ['Node.js', 'NodeJS', 'Node'],
  JavaScript: ['JavaScript', 'JS'],
  TypeScript: ['TypeScript', 'TS'],
  MongoDB: ['MongoDB', 'Mongo'],
  GitHub: ['GitHub', 'Github'],
  AWS: ['AWS', 'Amazon Web Services'],
  'REST API': ['REST API', 'REST APIs'],
}

// Skill weights
const skillWeights = {
  JavaScript: 5,
  TypeScript: 5,
  Python: 5,
  Java: 5,
  'C++': 5,
  C: 4,
  'C#': 4,
  Go: 5,
  Rust: 5,
  PHP: 3,
  Ruby: 3,
  Kotlin: 4,
  Swift: 4,

  React: 5,
  'React.js': 5,
  Angular: 5,
  'Vue.js': 5,
  HTML: 3,
  CSS: 3,
  'Tailwind CSS': 3,
  Bootstrap: 2,
  Redux: 3,
  'Next.js': 4,

  'Node.js': 5,
  'Express.js': 4,
  Django: 5,
  Flask: 4,
  FastAPI: 4,
  'Spring Boot': 5,

  MongoDB: 5,
  MySQL: 4,
  PostgreSQL: 4,
  SQLite: 3,
  SQL: 4,
  Redis: 3,

  'REST API': 4,
  'REST APIs': 4,
  JWT: 3,
  OAuth: 3,

  AWS: 5,
  Azure: 5,
  'Google Cloud': 5,
  Docker: 5,
  Kubernetes: 5,
  'CI/CD': 4,
  Jenkins: 3,
  'GitHub Actions': 3,

  Git: 3,
  GitHub: 2,
  GitLab: 2,

  'Machine Learning': 5,
  'Artificial Intelligence': 5,
  'Deep Learning': 5,
  TensorFlow: 5,
  PyTorch: 5,
  'Scikit-learn': 4,
  Pandas: 3,
  NumPy: 3,

  'Data Structures': 5,
  Algorithms: 5,
  'Data Structures and Algorithms': 5,
  OOP: 4,
  'Operating Systems': 4,
  DBMS: 4,
  'Computer Networks': 4,

  Postman: 2,
  Jest: 3,
  Selenium: 3,
  'Robot Framework': 3,
}

// Convert text to lowercase
const normalizeText = text => text.toLowerCase()

// Check if a skill exists in text
const containsSkill = (text, skill) => {
  const normalizedText = normalizeText(text)

  if (skillAliases[skill]) {
    return skillAliases[skill].some(alias => {
      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escapedAlias}\\b`, 'i')
      return regex.test(text)
    })
  }

  const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i')

  return regex.test(text)
}

// Resume Quality Helpers

const hasEmail = text => /\S+@\S+\.\S+/.test(text)

const hasPhone = text =>
  /(\+?\d{1,3}[- ]?)?\d{10}/.test(text)

const hasLinkedIn = text =>
  normalizeText(text).includes('linkedin')

const hasGitHub = text =>
  normalizeText(text).includes('github')

const hasProjects = text =>
  normalizeText(text).includes('project')

const hasEducation = text =>
  normalizeText(text).includes('education') ||
  normalizeText(text).includes('b.tech') ||
  normalizeText(text).includes('bachelor') ||
  normalizeText(text).includes('master')

const hasExperience = text =>
  normalizeText(text).includes('experience') ||
  normalizeText(text).includes('intern') ||
  normalizeText(text).includes('worked') ||
  normalizeText(text).includes('developer')

const hasSkillsSection = text =>
  normalizeText(text).includes('skills')

// Remove duplicate skills
const removeDuplicateSkills = skills => {
  const uniqueSkills = []

  skills.forEach(skill => {
    const exists = uniqueSkills.some(
      item => item.toLowerCase() === skill.toLowerCase(),
    )

    if (!exists) {
      uniqueSkills.push(skill)
    }
  })

  return uniqueSkills
}
const analyzeResume = (resumeText, jobDescription) => {
  // -------------------------------
  // Step 1: Find required skills
  // -------------------------------

  const requiredSkills = skillDatabase.filter(skill =>
    containsSkill(jobDescription, skill),
  )

  const uniqueRequiredSkills = removeDuplicateSkills(requiredSkills)

  // -------------------------------
  // Step 2: Find matched skills
  // -------------------------------

  const matchedSkills = uniqueRequiredSkills.filter(skill =>
    containsSkill(resumeText, skill),
  )

  // -------------------------------
  // Step 3: Find missing skills
  // -------------------------------

  const missingSkills = uniqueRequiredSkills.filter(
    skill => !containsSkill(resumeText, skill),
  )

  // -------------------------------
  // Step 4: Weighted Skill Score
  // -------------------------------

  let totalWeight = 0
  let matchedWeight = 0

  uniqueRequiredSkills.forEach(skill => {
    const weight = skillWeights[skill] || 1

    totalWeight += weight

    if (matchedSkills.includes(skill)) {
      matchedWeight += weight
    }
  })

  const keywordMatch =
    totalWeight === 0
      ? 0
      : Math.round((matchedWeight / totalWeight) * 100)

  // -------------------------------
  // Step 5: Resume Quality Score
  // -------------------------------

  let resumeQuality = 0

  if (hasEmail(resumeText)) resumeQuality += 10

  if (hasPhone(resumeText)) resumeQuality += 10

  if (hasLinkedIn(resumeText)) resumeQuality += 10

  if (hasGitHub(resumeText)) resumeQuality += 10

  if (hasSkillsSection(resumeText)) resumeQuality += 15

  if (hasProjects(resumeText)) resumeQuality += 15

  if (hasEducation(resumeText)) resumeQuality += 15

  if (hasExperience(resumeText)) resumeQuality += 15

  resumeQuality = Math.min(resumeQuality, 100)

  // -------------------------------
  // Step 6: Dynamic Suggestions
  // -------------------------------

  const suggestions = []

  if (!hasEmail(resumeText)) {
    suggestions.push('Add a professional email address.')
  }

  if (!hasPhone(resumeText)) {
    suggestions.push('Include your phone number.')
  }

  if (!hasLinkedIn(resumeText)) {
    suggestions.push('Include your LinkedIn profile.')
  }

  if (!hasGitHub(resumeText)) {
    suggestions.push('Include your GitHub profile.')
  }

  if (!hasProjects(resumeText)) {
    suggestions.push('Add a Projects section.')
  }

  if (!hasEducation(resumeText)) {
    suggestions.push('Include your Education details.')
  }

  if (!hasExperience(resumeText)) {
    suggestions.push('Include internships or work experience if available.')
  }

  if (!hasSkillsSection(resumeText)) {
    suggestions.push('Add a dedicated Skills section.')
  }

  missingSkills.forEach(skill => {
    suggestions.push(
      `Consider adding ${skill} if you have experience with it.`,
    )
  })

  // -------------------------------
  // Step 7: Final ATS Score
  // -------------------------------

  const atsScore = Math.round(
    keywordMatch * 0.75 +
      resumeQuality * 0.25,
  )

  // -------------------------------
  // Return Analysis
  // -------------------------------

  return {
    atsScore,
    keywordMatch,
    resumeQuality,

    requiredSkills: uniqueRequiredSkills,

    matchedSkills,

    missingSkills,

    suggestions,

    totalRequiredSkills: uniqueRequiredSkills.length,

    totalMatchedSkills: matchedSkills.length,

    totalMissingSkills: missingSkills.length,
  }
}

module.exports = {
  analyzeResume,
}