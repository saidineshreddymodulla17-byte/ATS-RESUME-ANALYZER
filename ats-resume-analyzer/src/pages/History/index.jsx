import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  FiCalendar,
  FiChevronRight,
  FiClock,
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

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'https://ats-resume-analyzer-backend-nel5.onrender.com/api/resumes/history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        setAnalyses(data)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAnalysis = async id => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `https://ats-resume-analyzer-backend-nel5.onrender.com/api/resumes/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.ok) {
      setAnalyses(previous =>
        previous.filter(item => item._id !== id),
      )
    }
  }

  const filteredAnalyses = analyses.filter(analysis =>
    analysis.resumeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold">
            Loading History...
          </h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Analysis History
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Your previous analyses
            </h1>

            <p className="mt-2 text-slate-600">
              Review your previous ATS resume analyses.
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

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={event =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search Resume..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {filteredAnalyses.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredAnalyses.map(analysis => (
                <HistoryItem
                  key={analysis._id}
                  analysis={analysis}
                  onDelete={deleteAnalysis}
                />
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500">
                <FiClock />
              </div>

              <h2 className="mt-5 text-lg font-bold">
                No Analysis Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
const HistoryItem = ({analysis, onDelete}) => {
  const {
    _id,
    resumeName,
    atsScore,
    keywordMatch,
    totalMatchedSkills,
    totalMissingSkills,
    createdAt,
  } = analysis

  const getScoreClass = () => {
    if (atsScore >= 85) {
      return 'bg-green-50 text-green-600'
    }

    if (atsScore >= 70) {
      return 'bg-amber-50 text-amber-600'
    }

    return 'bg-red-50 text-red-600'
  }

  return (
    <div className="flex flex-col gap-5 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
        <FiFileText />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-bold text-slate-900">
          {resumeName}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          ATS Score : {atsScore}% | Keyword Match : {keywordMatch}%
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FiCalendar />
            {new Date(createdAt).toLocaleDateString()}
          </span>

          <span className="text-green-600">
            {totalMatchedSkills} matched
          </span>

          <span className="text-amber-600">
            {totalMissingSkills} missing
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <div
          className={`rounded-full px-4 py-2 text-sm font-bold ${getScoreClass()}`}
        >
          {atsScore}%
        </div>

        <Link
          to={`/analysis/${_id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <FiChevronRight />
        </Link>

        <button
          type="button"
          onClick={() => onDelete(_id)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default History