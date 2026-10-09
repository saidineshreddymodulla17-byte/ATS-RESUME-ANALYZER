import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  FiActivity,
  FiAward,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiTarget,
  FiUploadCloud,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const Dashboard = () => {
  const [user, setUser] = useState({})
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // =====================================================
  // Load logged-in user
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem('user'),
      )

      if (storedUser) {
        setUser(storedUser)
      }
    } catch (error) {
      console.error('Error reading user:', error)
    }
  }, [])

  // =====================================================
  // Fetch user's AI analysis history
  // =====================================================

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          setError('Please login again.')
          setLoading(false)
          return
        }

        const response = await fetch(
          'http://https://ats-resume-analyzer-backendupdated.onrender.com/api/resumes/history',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to fetch analyses',
          )
        }

        setAnalyses(
          Array.isArray(data) ? data : [],
        )
      } catch (error) {
        console.error(
          'Dashboard history error:',
          error,
        )

        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  // =====================================================
  // AI STATISTICS
  // =====================================================

  const totalAnalyses = analyses.length

  // Get Gemini semantic scores
  const aiScores = analyses.map(
    item =>
      Number(item.aiAnalysis?.semanticScore) || 0,
  )

  const bestAIScore =
    aiScores.length > 0
      ? Math.max(...aiScores)
      : 0

  const averageAIScore =
    aiScores.length > 0
      ? Math.round(
          aiScores.reduce(
            (total, score) => total + score,
            0,
          ) / aiScores.length,
        )
      : 0

  // Count total skill gaps found
  const totalSkillGaps = analyses.reduce(
    (total, item) =>
      total +
      (Array.isArray(item.aiAnalysis?.skillGaps)
        ? item.aiAnalysis.skillGaps.length
        : 0),
    0,
  )

  // =====================================================
  // Analyses performed this month
  // =====================================================

  const currentDate = new Date()

  const analysesThisMonth = analyses.filter(
    item => {
      if (!item.createdAt) {
        return false
      }

      const date = new Date(item.createdAt)

      return (
        date.getMonth() ===
          currentDate.getMonth() &&
        date.getFullYear() ===
          currentDate.getFullYear()
      )
    },
  ).length

  // =====================================================
  // Most recent 3 analyses
  // =====================================================

  const recentAnalyses = analyses
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt),
    )
    .slice(0, 3)

  return (
    <DashboardLayout>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Good morning, {user.name || 'there'} 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Here's an overview of your AI resume
            analysis.
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <FiUploadCloud />
          Analyze Resume
        </Link>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Analyses"
          value={
            loading ? '...' : totalAnalyses
          }
          description={`${analysesThisMonth} this month`}
          icon={<FiFileText />}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Best AI Score"
          value={
            loading
              ? '...'
              : `${bestAIScore}%`
          }
          description={
            analyses.length > 0
              ? 'Your highest AI score'
              : 'No analyses yet'
          }
          icon={<FiAward />}
          iconClass="bg-green-50 text-green-600"
        />

        <StatCard
          title="Average AI Score"
          value={
            loading
              ? '...'
              : `${averageAIScore}%`
          }
          description="Across all AI analyses"
          icon={<FiActivity />}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Skill Gaps"
          value={
            loading ? '...' : totalSkillGaps
          }
          description="Skills identified by AI"
          icon={<FiTarget />}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

        {/* ===================================================
            RECENT ANALYSES
        ==================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent AI Analyses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest Gemini-powered resume
                analysis results.
              </p>
            </div>

            <Link
              to="/history"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
              <FiArrowRight />
            </Link>
          </div>

          {/* Loading */}

          {loading && (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading your analyses...
            </div>
          )}

          {/* No analyses */}

          {!loading &&
            recentAnalyses.length === 0 && (
              <div className="px-6 py-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                  <FiFileText />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No analyses yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Upload your first resume to
                  get your AI analysis.
                </p>

                <Link
                  to="/upload"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Analyze Resume
                  <FiArrowRight />
                </Link>
              </div>
            )}

          {/* Recent analysis list */}

          {!loading &&
            recentAnalyses.length > 0 && (
              <div className="divide-y divide-slate-100">

                {recentAnalyses.map(
                  analysis => (
                    <AnalysisItem
                      key={analysis._id}
                      analysis={analysis}
                    />
                  ),
                )}

              </div>
            )}

        </section>

        {/* ===================================================
            ANALYZE NEW RESUME
        ==================================================== */}

        <section className="rounded-2xl bg-blue-600 p-7 text-white">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
            <FiUploadCloud />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Analyze a new resume
          </h2>

          <p className="mt-3 leading-7 text-blue-100">
            Upload your resume and paste the
            job description to get AI-powered
            semantic analysis, skill gaps, and
            personalized recommendations.
          </p>

          <div className="mt-6 space-y-3">
            <QuickFeature text="AI-powered resume matching" />
            <QuickFeature text="Skill gap detection" />
            <QuickFeature text="Personalized AI suggestions" />
          </div>

          <Link
            to="/upload"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Start Analysis
            <FiArrowRight />
          </Link>

        </section>
      </div>
    </DashboardLayout>
  )
}

// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({
  title,
  value,
  description,
  icon,
  iconClass,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-sm text-slate-500">
        {description}
      </p>

    </div>
  )
}

// =========================================================
// ANALYSIS ITEM
// =========================================================

const AnalysisItem = ({analysis}) => {
  const {
    resumeName,
    createdAt,
    aiAnalysis,
  } = analysis

  const score =
    Number(
      aiAnalysis?.semanticScore,
    ) || 0

  const getScoreClass = () => {
    if (score >= 85) {
      return 'bg-green-50 text-green-600'
    }

    if (score >= 70) {
      return 'bg-amber-50 text-amber-600'
    }

    return 'bg-red-50 text-red-600'
  }

  const formattedDate = createdAt
    ? formatDate(createdAt)
    : 'Recently'

  return (
    <div className="flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <FiFileText />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="truncate font-semibold text-slate-900">
          {resumeName || 'Resume Analysis'}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          AI analysis • {formattedDate}
        </p>

      </div>

      <div
        className={`rounded-full px-3 py-1 text-sm font-bold ${getScoreClass()}`}
      >
        {score}%
      </div>

    </div>
  )
}

// =========================================================
// DATE FORMATTER
// =========================================================

const formatDate = dateString => {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Recently'
  }

  const now = new Date()

  const difference =
    now.getTime() - date.getTime()

  const oneDay =
    24 * 60 * 60 * 1000

  if (difference < oneDay) {
    return 'Today'
  }

  if (difference < oneDay * 2) {
    return 'Yesterday'
  }

  return date.toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  )
}

// =========================================================
// QUICK FEATURE
// =========================================================

const QuickFeature = ({text}) => {
  return (
    <div className="flex items-center gap-3">

      <FiCheckCircle className="shrink-0 text-blue-200" />

      <span className="text-sm text-blue-50">
        {text}
      </span>

    </div>
  )
}

export default Dashboard