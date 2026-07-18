import {Link} from 'react-router-dom'
import {
  FiActivity,
  FiAward,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiSearch,
  FiUploadCloud,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const Dashboard = () => {
  const recentAnalyses = [
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer',
      fileName: 'dinesh_resume.pdf',
      score: 84,
      date: 'Today',
    },
    {
      id: 2,
      company: 'Amazon',
      role: 'SDE I',
      fileName: 'resume_v2.pdf',
      score: 79,
      date: 'Yesterday',
    },
    {
      id: 3,
      company: 'Microsoft',
      role: 'Software Engineer',
      fileName: 'software_resume.pdf',
      score: 91,
      date: 'Jul 8, 2026',
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Good morning, Dinesh 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Here's an overview of your resume performance.
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

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Analyses"
          value="12"
          description="3 this month"
          icon={<FiFileText />}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Best ATS Score"
          value="91%"
          description="+7 points improved"
          icon={<FiAward />}
          iconClass="bg-green-50 text-green-600"
        />

        <StatCard
          title="Average Score"
          value="84%"
          description="Across all analyses"
          icon={<FiActivity />}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Keywords Matched"
          value="38"
          description="Across recent resumes"
          icon={<FiSearch />}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Analyses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest resume analysis results.
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

          <div className="divide-y divide-slate-100">
            {recentAnalyses.map(analysis => (
              <AnalysisItem key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-blue-600 p-7 text-white">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
            <FiUploadCloud />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Analyze a new resume
          </h2>

          <p className="mt-3 leading-7 text-blue-100">
            Upload your resume and paste the job description to get your ATS
            score, keyword matches, and AI-powered suggestions.
          </p>

          <div className="mt-6 space-y-3">
            <QuickFeature text="Instant ATS compatibility score" />
            <QuickFeature text="Missing skills and keywords" />
            <QuickFeature text="AI improvement suggestions" />
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

const StatCard = ({title, value, description, icon, iconClass}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </div>
  )
}

const AnalysisItem = ({analysis}) => {
  const {company, role, fileName, score, date} = analysis

  const getScoreClass = () => {
    if (score >= 85) {
      return 'bg-green-50 text-green-600'
    }

    if (score >= 70) {
      return 'bg-amber-50 text-amber-600'
    }

    return 'bg-red-50 text-red-600'
  }

  return (
    <div className="flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <FiFileText />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2">
          <h3 className="font-semibold text-slate-900">{company}</h3>
          <span className="text-slate-300">•</span>
          <p className="text-sm text-slate-600">{role}</p>
        </div>

        <p className="mt-1 truncate text-sm text-slate-400">
          {fileName} • {date}
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

const QuickFeature = ({text}) => {
  return (
    <div className="flex items-center gap-3">
      <FiCheckCircle className="shrink-0 text-blue-200" />
      <span className="text-sm text-blue-50">{text}</span>
    </div>
  )
}

export default Dashboard