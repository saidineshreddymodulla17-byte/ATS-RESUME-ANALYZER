import {useEffect, useState} from 'react'
import {
  Link,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom'

import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiFileText,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const Analysis = () => {
  const location = useLocation()
  const {id} = useParams()

  const [loading, setLoading] = useState(false)

  const [analysisData, setAnalysisData] = useState(
    location.state?.uploadData || null,
  )

  useEffect(() => {
    if (analysisData) return

    if (!id) return

    const fetchAnalysis = async () => {
      try {
        setLoading(true)

        const token = localStorage.getItem('token')

        const response = await fetch(
          `http://localhost:5000/api/resumes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          setAnalysisData({
            file: {
              originalName: data.resumeName,
            },
            analysis: {
              atsScore: data.atsScore,
              keywordMatch: data.keywordMatch,
              resumeQuality: data.resumeQuality,
              matchedSkills: data.matchedSkills,
              missingSkills: data.missingSkills,
              suggestions: data.suggestions,
              totalMatchedSkills: data.totalMatchedSkills,
              totalMissingSkills: data.totalMissingSkills,
            },
          })
        }
      } catch (error) {
        console.error('Error fetching analysis:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [analysisData, id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-600">
            Loading analysis...
          </h2>
        </div>
      </DashboardLayout>
    )
  }

  if (!loading && !analysisData) {
    return <Navigate to="/history" replace />
  }

  const {analysis, file} = analysisData

  const {
    atsScore,
    keywordMatch,
    resumeQuality,
    matchedSkills,
    missingSkills,
    suggestions,
    totalMatchedSkills,
    totalMissingSkills,
  } = analysis

  const getScoreLabel = score => {
    if (score >= 80) return 'Strong Match'

    if (score >= 60) return 'Good Match'

    if (score >= 40) return 'Moderate Match'

    return 'Needs Improvement'
  }

  const getScoreDescription = score => {
    if (score >= 80) {
      return 'Your resume is strongly aligned with this position.'
    }

    if (score >= 60) {
      return 'Your resume has good alignment with this position, but some improvements could make it stronger.'
    }

    if (score >= 40) {
      return 'Your resume has moderate alignment with this position. Adding relevant missing skills may improve your match.'
    }

    return 'Your resume currently has limited alignment with this position. Review the missing skills and tailor your resume carefully.'
  }

  // Suggestions coming directly from backend
  const improvementSuggestions = suggestions || []

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <FiArrowLeft />
              Back to upload
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Your Resume Analysis
            </h1>

            <p className="mt-2 text-slate-600">
              Analysis results • {file?.originalName || 'Resume PDF'}
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <FiRefreshCw />
            Analyze Another
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Overall ATS Score
            </p>

            <div className="mx-auto mt-6 flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-blue-100">
              <div>
                <span className="text-6xl font-bold text-slate-900">
                  {atsScore}
                </span>

                <span className="text-xl text-slate-400">/100</span>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-600">
              <FiTrendingUp />
              {getScoreLabel(atsScore)}
            </div>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500">
              {getScoreDescription(atsScore)}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <ResultCard
              icon={<FiTarget />}
              title="Keyword Match"
              value={`${keywordMatch}%`}
              description="Keyword alignment with job description"
              iconClass="bg-blue-50 text-blue-600"
            />

            <ResultCard
              icon={<FiCheckCircle />}
              title="Matched Skills"
              value={totalMatchedSkills}
              description="Relevant skills detected"
              iconClass="bg-green-50 text-green-600"
            />

            <ResultCard
              icon={<FiAlertCircle />}
              title="Missing Skills"
              value={totalMissingSkills}
              description="Skills worth reviewing"
              iconClass="bg-amber-50 text-amber-600"
            />

            <ResultCard
              icon={<FiFileText />}
              title="Resume Quality"
              value={`${resumeQuality}%`}
              description="Resume completeness score"
              iconClass="bg-purple-50 text-purple-600"
            />
          </div>
        </section>
                <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <SkillSection
            title="Matched Skills"
            description="Skills found in both your resume and the job description."
            skills={matchedSkills}
            type="matched"
          />

          <SkillSection
            title="Missing Skills"
            description="Important skills found in the job description but not your resume."
            skills={missingSkills}
            type="missing"
          />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl text-purple-600">
                <FiZap />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Improvement Suggestions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Personalized recommendations generated from your ATS analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {improvementSuggestions.length > 0 ? (
              improvementSuggestions.map((suggestion, index) => (
                <SuggestionCard
                  key={index}
                  suggestion={{
                    title: `Suggestion ${index + 1}`,
                    description: suggestion,
                    priority: 'High',
                  }}
                  number={index + 1}
                />
              ))
            ) : (
              <div className="px-6 py-8 text-center text-slate-500">
                Great! No major suggestions were generated.
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

const ResultCard = ({
  icon,
  title,
  value,
  description,
  iconClass,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  )
}

const SkillSection = ({
  title,
  description,
  skills,
  type,
}) => {
  const isMatched = type === 'matched'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
            isMatched
              ? 'bg-green-50 text-green-600'
              : 'bg-amber-50 text-amber-600'
          }`}
        >
          {isMatched ? (
            <FiCheckCircle />
          ) : (
            <FiAlertCircle />
          )}
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map(skill => (
            <span
              key={skill}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                isMatched
                  ? 'bg-green-50 text-green-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            {isMatched
              ? 'No matching skills were detected.'
              : 'No missing skills were detected.'}
          </p>
        )}
      </div>
    </div>
  )
}

const SuggestionCard = ({
  suggestion,
  number,
}) => {
  const {title, description, priority} = suggestion

  return (
    <div className="flex gap-4 px-6 py-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
        {number}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-bold text-slate-900">
            {title}
          </h3>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              priority === 'High'
                ? 'bg-red-50 text-red-600'
                : 'bg-amber-50 text-amber-600'
            }`}
          >
            {priority}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Analysis