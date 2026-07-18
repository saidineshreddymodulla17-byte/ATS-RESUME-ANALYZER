import {Link} from 'react-router-dom'
import {FiFileText, FiCheckCircle} from 'react-icons/fi'

const AuthLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden bg-blue-600 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-blue-600">
            <FiFileText />
          </div>

          <span className="text-2xl font-bold">
            ResumeAI
          </span>
        </Link>

        <div className="max-w-lg">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-200">
            AI-Powered Resume Analysis
          </p>

          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Build a resume that gets you noticed.
          </h1>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            Analyze your resume against real job descriptions, discover missing
            skills, and receive actionable AI-powered feedback.
          </p>

          <div className="mt-10 space-y-4">
            <Feature text="Instant ATS compatibility score" />
            <Feature text="Discover missing skills and keywords" />
            <Feature text="AI-powered resume improvement suggestions" />
            <Feature text="Track your resume progress over time" />
          </div>
        </div>

        <p className="text-sm text-blue-200">
          © 2026 ResumeAI. Improve your resume. Improve your chances.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-center lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <FiFileText />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Resume<span className="text-blue-600">AI</span>
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

const Feature = ({text}) => {
  return (
    <div className="flex items-center gap-3">
      <FiCheckCircle className="shrink-0 text-xl text-blue-200" />
      <span className="text-blue-50">{text}</span>
    </div>
  )
}

export default AuthLayout