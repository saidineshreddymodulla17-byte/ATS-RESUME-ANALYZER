import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiCpu,
  FiFileText,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const History = () => {
  const [analyses, setAnalyses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // =====================================================
  // FETCH HISTORY
  // =====================================================

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        console.error('No authentication token found')
        return
      }

      const response = await fetch(
        'https://ats-resume-analyzer-backendupdated.onrender.com/api/resumes/history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        setAnalyses(
          Array.isArray(data) ? data : [],
        )
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(
        'History fetch error:',
        error,
      )
    } finally {
      setIsLoading(false)
    }
  }

  // =====================================================
  // DELETE ANALYSIS
  // =====================================================

  const deleteAnalysis = async id => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        `https://ats-resume-analyzer-backendupdated.onrender.com/api/resumes/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        setAnalyses(previous =>
          previous.filter(
            item => item._id !== id,
          ),
        )
      }
    } catch (error) {
      console.error(
        'Delete analysis error:',
        error,
      )
    }
  }

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredAnalyses = analyses.filter(
    analysis =>
      analysis.resumeName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase(),
        ),
  )

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <DashboardLayout>

        <div className="flex h-96 items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <FiCpu className="animate-pulse text-2xl" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Loading AI History...
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Fetching your previous analyses.
            </p>

          </div>

        </div>

      </DashboardLayout>
    )
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
              AI Analysis History
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Your previous analyses
            </h1>

            <p className="mt-2 text-slate-600">
              Review your previous Gemini-powered
              resume analyses.
            </p>

          </div>

          <Link
            to="/upload"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
          >
            <FiUploadCloud />
            New Analysis
          </Link>

        </div>

        {/* =================================================
            SEARCH + LIST
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">

          {/* SEARCH */}

          <div className="border-b border-slate-100 p-5">

            <div className="relative max-w-md">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={event =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
                placeholder="Search Resume..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* RESULTS */}

          {filteredAnalyses.length > 0 ? (

            <div className="divide-y divide-slate-100">

              {filteredAnalyses.map(
                analysis => (
                  <HistoryItem
                    key={analysis._id}
                    analysis={analysis}
                    onDelete={deleteAnalysis}
                  />
                ),
              )}

            </div>

          ) : (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500">
                <FiClock />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-900">
                No Analysis Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {searchTerm
                  ? 'No resumes match your search.'
                  : 'You have not analyzed a resume yet.'}
              </p>

              {!searchTerm && (
                <Link
                  to="/upload"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <FiUploadCloud />
                  Analyze Resume
                </Link>
              )}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  )
}

// =========================================================
// HISTORY ITEM
// =========================================================

const HistoryItem = ({
  analysis,
  onDelete,
}) => {
  const {
    _id,
    resumeName,
    aiAnalysis,
    createdAt,
  } = analysis

  const semanticScore =
    Number(
      aiAnalysis?.semanticScore,
    ) || 0

  const skillGaps =
    Array.isArray(
      aiAnalysis?.skillGaps,
    )
      ? aiAnalysis.skillGaps.length
      : 0

  const getScoreClass = () => {
    if (semanticScore >= 85) {
      return 'bg-green-50 text-green-600'
    }

    if (semanticScore >= 70) {
      return 'bg-amber-50 text-amber-600'
    }

    return 'bg-red-50 text-red-600'
  }

  const getMatchLabel = () => {
    if (semanticScore >= 85) {
      return 'Excellent Match'
    }

    if (semanticScore >= 70) {
      return 'Good Match'
    }

    if (semanticScore >= 50) {
      return 'Moderate Match'
    }

    return 'Needs Improvement'
  }

  return (
    <div className="flex flex-col gap-5 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center">

      {/* ICON */}

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl text-purple-600">
        <FiFileText />
      </div>

      {/* DETAILS */}

      <div className="min-w-0 flex-1">

        <h2 className="truncate font-bold text-slate-900">
          {resumeName || 'Resume Analysis'}
        </h2>

        <p className="mt-1 flex items-center gap-2 text-sm text-purple-600">
          <FiCpu />
          Gemini AI Analysis
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

          <span className="flex items-center gap-1">
            <FiCalendar />
            {createdAt
              ? new Date(
                  createdAt,
                ).toLocaleDateString(
                  'en-IN',
                )
              : 'Recently'}
          </span>

          <span className="text-blue-600">
            {getMatchLabel()}
          </span>

          <span className="text-amber-600">
            {skillGaps} skill gap
            {skillGaps !== 1 ? 's' : ''}
          </span>

        </div>

      </div>

      {/* SCORE + ACTIONS */}

      <div className="flex items-center justify-end gap-3">

        <div
          className={`rounded-full px-4 py-2 text-sm font-bold ${getScoreClass()}`}
        >
          {semanticScore}%
        </div>

        <Link
          to={`/analysis/${_id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-purple-50 hover:text-purple-600"
          title="View AI analysis"
        >
          <FiChevronRight />
        </Link>

        <button
          type="button"
          onClick={() =>
            onDelete(_id)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          title="Delete analysis"
        >
          <FiTrash2 />
        </button>

      </div>

    </div>
  )
}

export default History