import {useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

import {
  FiArrowLeft,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
  FiTarget,
  FiCpu,
  FiTrendingUp,
  FiChevronRight,
  FiInfo,
  FiZap,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const API_URL = 'https://ats-resume-analyzer-backendupdated.onrender.com'

// =========================================================
// SCORE RING
// =========================================================

const ScoreRing = ({
  score,
  label,
  color = '#9333ea',
}) => {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0),
  )

  return (
    <div className="relative h-32 w-32 shrink-0">

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            ${color} ${safeScore * 3.6}deg,
            #e5e7eb ${safeScore * 3.6}deg
          )`,
        }}
      />

      <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-white">

        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {safeScore}
        </span>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          / 100
        </span>

      </div>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
        style={{
          backgroundColor: color,
        }}
      >
        {label}
      </div>

    </div>
  )
}

// =========================================================
// SECTION HEADER
// =========================================================

const SectionHeader = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="mb-5 flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div>

        <h2 className="text-lg font-bold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-sm text-slate-500">
            {description}
          </p>
        )}

      </div>

    </div>
  )
}

// =========================================================
// LIST ITEM
// =========================================================

const ListItem = ({
  children,
  type = 'success',
}) => {
  const isSuccess = type === 'success'

  return (
    <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">

      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isSuccess
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-amber-100 text-amber-600'
        }`}
      >
        {isSuccess ? (
          <FiCheckCircle className="text-sm" />
        ) : (
          <FiAlertCircle className="text-sm" />
        )}
      </div>

      <p className="text-sm leading-6 text-slate-600">
        {children}
      </p>

    </div>
  )
}

// =========================================================
// SKILL PILL
// =========================================================

const SkillPill = ({
  children,
  type = 'blue',
}) => {
  const styles = {
    blue:
      'border-blue-100 bg-blue-50 text-blue-700',

    danger:
      'border-red-100 bg-red-50 text-red-700',

    success:
      'border-emerald-100 bg-emerald-50 text-emerald-700',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[type]
      }`}
    >
      {children}
    </span>
  )
}

// =========================================================
// MAIN ANALYSIS PAGE
// =========================================================

const Analysis = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {id} = useParams()

  const [analysisData, setAnalysisData] =
    useState(
      location.state?.uploadData || null,
    )

  const [loading, setLoading] = useState(
    !analysisData && !!id,
  )

  const [error, setError] = useState('')

  // =====================================================
  // FETCH ANALYSIS
  // =====================================================

  useEffect(() => {
    if (analysisData || !id) {
      return
    }

    const fetchAnalysis = async () => {
      try {
        setLoading(true)

        const token =
          localStorage.getItem('token')

        if (!token) {
          throw new Error(
            'Please login again.',
          )
        }

        const response = await fetch(
          `${API_URL}/api/resumes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to load analysis',
          )
        }

        setAnalysisData({
          file: {
            originalName:
              data.resumeName,
          },

          aiAnalysis:
            data.aiAnalysis,
        })
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [analysisData, id])

  // =====================================================
  // NORMALIZE AI DATA
  // =====================================================

  const normalizedData = useMemo(() => {
    if (!analysisData) {
      return null
    }

    const aiAnalysis =
      analysisData.aiAnalysis ||
      analysisData.analysis?.aiAnalysis ||
      {}

    return {
      file: analysisData.file || {},

      aiAnalysis: {
        semanticScore:
          Number(
            aiAnalysis.semanticScore,
          ) || 0,

        summary:
          aiAnalysis.summary || '',

        strengths:
          Array.isArray(
            aiAnalysis.strengths,
          )
            ? aiAnalysis.strengths
            : [],

        weaknesses:
          Array.isArray(
            aiAnalysis.weaknesses,
          )
            ? aiAnalysis.weaknesses
            : [],

        skillGaps:
          Array.isArray(
            aiAnalysis.skillGaps,
          )
            ? aiAnalysis.skillGaps
            : [],

        suggestions:
          Array.isArray(
            aiAnalysis.suggestions,
          )
            ? aiAnalysis.suggestions
            : [],
      },
    }
  }, [analysisData])

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <FiRefreshCw className="animate-spin text-2xl" />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Loading your AI analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fetching your resume insights...
            </p>

          </div>

        </div>

      </DashboardLayout>
    )
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <DashboardLayout>

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiAlertCircle className="text-2xl" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Unable to load analysis
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              onClick={() =>
                navigate('/upload')
              }
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Analyze a Resume
            </button>

          </div>

        </div>

      </DashboardLayout>
    )
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (!normalizedData) {
    return (
      <DashboardLayout>

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <FiFileText className="mx-auto text-5xl text-slate-300" />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No analysis found
            </h2>

            <button
              onClick={() =>
                navigate('/upload')
              }
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Upload Resume
            </button>

          </div>

        </div>

      </DashboardLayout>
    )
  }

  const {
    file,
    aiAnalysis,
  } = normalizedData

  const semanticScore =
    aiAnalysis.semanticScore

  // =====================================================
  // SCORE LABEL
  // =====================================================

  const matchLabel =
    semanticScore >= 85
      ? 'Excellent Match'
      : semanticScore >= 70
        ? 'Good Match'
        : semanticScore >= 50
          ? 'Moderate Match'
          : 'Needs Improvement'

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <DashboardLayout>

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-8">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

          <button
            onClick={() =>
              navigate('/upload')
            }
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <FiArrowLeft className="transition group-hover:-translate-x-1" />
            Back to Upload
          </button>

          <button
            onClick={() =>
              navigate('/upload')
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
          >
            <FiRefreshCw />
            Analyze Another
          </button>

        </div>

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              AI Resume Analysis
            </h1>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600">
              GEMINI POWERED
            </span>

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">

            <FiFileText />

            <span className="font-medium text-slate-700">
              {file.originalName ||
                'Resume'}
            </span>

            <span>•</span>

            <span>
              Semantic AI Assessment
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          AI SCORE HERO
      ================================================== */}

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">

        {/* SCORE */}

        <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/50 to-blue-50 p-7 shadow-sm">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <FiCpu />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Gemini AI Match Score
                </span>

              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                {matchLabel}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Gemini analyzed the semantic
                relationship between your
                resume and the target job
                description.
              </p>

            </div>

            <ScoreRing
              score={semanticScore}
              label="AI Match"
              color="#9333ea"
            />

          </div>

        </div>

        {/* AI DESCRIPTION */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiTarget />
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Analysis Method
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Generative AI
              </h3>

            </div>

          </div>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Gemini evaluates the context,
            relevance, experience, skills,
            and overall alignment between
            your resume and the job
            description.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700">
            <FiCpu />
            Gemini semantic analysis
          </div>

        </div>

      </div>

      {/* =================================================
          AI SUMMARY
      ================================================== */}

      <section className="mb-8 overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">

        <div className="relative overflow-hidden border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-blue-50 px-6 py-7 sm:px-8">

          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="relative flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
              <FiCpu className="text-xl" />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-xl font-bold text-slate-950">
                  Gemini AI Assessment
                </h2>

                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                  AI Generated
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Semantic analysis of your
                resume against the job
                description
              </p>

            </div>

          </div>

        </div>

        <div className="p-6 sm:p-8">

          {/* SUMMARY */}

          {aiAnalysis.summary && (
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

              <div className="mb-2 flex items-center gap-2">

                <FiInfo className="text-blue-600" />

                <h3 className="font-bold text-slate-900">
                  AI Summary
                </h3>

              </div>

              <p className="text-sm leading-7 text-slate-600">
                {aiAnalysis.summary}
              </p>

            </div>
          )}

          {/* STRENGTHS + WEAKNESSES */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* STRENGTHS */}

            <div>

              <div className="mb-4 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <FiCheckCircle />
                </div>

                <h3 className="font-bold text-slate-900">
                  Strengths
                </h3>

              </div>

              <div className="space-y-3">

                {aiAnalysis.strengths.length > 0 ? (
                  aiAnalysis.strengths.map(
                    (item, index) => (
                      <ListItem
                        key={index}
                        type="success"
                      >
                        {item}
                      </ListItem>
                    ),
                  )
                ) : (
                  <p className="text-sm text-slate-400">
                    No AI strengths available.
                  </p>
                )}

              </div>

            </div>

            {/* WEAKNESSES */}

            <div>

              <div className="mb-4 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <FiAlertCircle />
                </div>

                <h3 className="font-bold text-slate-900">
                  Weaknesses
                </h3>

              </div>

              <div className="space-y-3">

                {aiAnalysis.weaknesses.length > 0 ? (
                  aiAnalysis.weaknesses.map(
                    (item, index) => (
                      <ListItem
                        key={index}
                        type="warning"
                      >
                        {item}
                      </ListItem>
                    ),
                  )
                ) : (
                  <p className="text-sm text-slate-400">
                    No AI weaknesses available.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          AI SKILL GAPS
      ================================================== */}

      <section className="mb-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-7">

        <SectionHeader
          icon={
            <FiTarget className="text-purple-600" />
          }
          title="AI-Detected Skill Gaps"
          description="Gemini identified technologies and concepts that may strengthen your profile."
        />

        {aiAnalysis.skillGaps.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">

            {aiAnalysis.skillGaps.map(
              (skill, index) => (
                <SkillPill
                  key={index}
                  type="blue"
                >
                  {skill}
                </SkillPill>
              ),
            )}

          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No additional AI skill gaps
            detected.
          </p>
        )}

      </section>

      {/* =================================================
          AI RECOMMENDATIONS
      ================================================== */}

      <section className="mb-8">

        <SectionHeader
          icon={
            <FiTrendingUp className="text-blue-600" />
          }
          title="AI Recommendations"
          description="Personalized suggestions generated from your resume and the target role."
        />

        <div className="grid gap-4 md:grid-cols-2">

          {aiAnalysis.suggestions.length > 0 ? (
            aiAnalysis.suggestions.map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >

                  <div className="flex gap-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <p className="text-sm leading-6 text-slate-600">
                        {suggestion}
                      </p>

                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
                        AI recommendation
                        <FiChevronRight />
                      </div>

                    </div>

                  </div>

                </div>
              ),
            )
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-400">
              No AI recommendations available.
            </div>
          )}

        </div>

      </section>

      {/* =================================================
          FOOTER CTA
      ================================================== */}

      <div className="mb-5 overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] to-[#581c87] p-6 text-white shadow-xl sm:p-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <FiZap className="text-purple-300" />

              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Keep improving
              </span>

            </div>

            <h2 className="text-xl font-bold">
              Ready to optimize your resume?
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-300">
              Update your resume based on
              Gemini's insights and run another
              analysis to track your improvement.
            </p>

          </div>

          <button
            onClick={() =>
              navigate('/upload')
            }
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-purple-50"
          >
            Analyze Again
            <FiChevronRight />
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Analysis