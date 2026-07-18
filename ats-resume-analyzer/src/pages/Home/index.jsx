import {Link} from 'react-router-dom'
import {
  FiArrowRight,
  FiCheckCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'

import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
          <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl" />

          <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-purple-200 opacity-30 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <FiZap />
                AI-Powered Resume Analysis
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-6xl">
                Land more interviews with a{' '}
                <span className="text-blue-600">smarter resume.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Analyze your resume against any job description. Get an instant
                ATS score, discover missing keywords, and receive AI-powered
                suggestions to improve your chances of getting shortlisted.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Analyze My Resume
                  <FiArrowRight />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                >
                  See How It Works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  Free to get started
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  Instant analysis
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  AI-powered feedback
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Resume Analysis
                    </p>
                    <h2 className="mt-1 font-semibold text-slate-900">
                      Software Engineer Resume
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                    Excellent
                  </span>
                </div>

                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    Your ATS Score
                  </p>

                  <div className="mx-auto mt-4 flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-blue-100">
                    <div>
                      <span className="text-4xl font-bold text-slate-900">
                        84
                      </span>
                      <span className="text-lg text-slate-500">/100</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Your resume is well optimized for this role.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Keywords Matched
                    </p>
                  </div>

                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-2xl font-bold text-amber-600">4</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Missing Skills
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiTrendingUp />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Score improvement</p>
                    <p className="font-bold text-slate-900">+18 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Powerful Features
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Everything you need to improve your resume
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                Get actionable insights that help your resume perform better
                against applicant tracking systems.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<FiTarget />}
                title="ATS Score"
                description="Get an instant score showing how well your resume matches the target role."
              />

              <FeatureCard
                icon={<FiSearch />}
                title="Keyword Matching"
                description="Discover important keywords and skills missing from your resume."
              />

              <FeatureCard
                icon={<FiZap />}
                title="AI Suggestions"
                description="Receive intelligent and actionable recommendations to strengthen your resume."
              />

              <FeatureCard
                icon={<FiTrendingUp />}
                title="Track Progress"
                description="Save previous analyses and monitor how your resume improves over time."
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="bg-slate-50 px-6 py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                How It Works
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Improve your resume in three simple steps
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <StepCard
                number="01"
                title="Upload Your Resume"
                description="Upload your PDF resume securely for instant text extraction."
              />

              <StepCard
                number="02"
                title="Add Job Description"
                description="Paste the job description for the role you want to target."
              />

              <StepCard
                number="03"
                title="Get Your Analysis"
                description="Receive your ATS score, missing keywords, and AI-powered suggestions."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 px-6 py-8 text-center text-sm text-slate-400">
        <p>© 2026 ResumeAI. Built to help job seekers create better resumes.</p>
      </footer>
    </div>
  )
}

const FeatureCard = ({icon, title, description}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-2 leading-7 text-slate-600">{description}</p>
    </div>
  )
}

const StepCard = ({number, title, description}) => {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-7">
      <span className="text-5xl font-black text-blue-100">{number}</span>

      <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  )
}

export default Home