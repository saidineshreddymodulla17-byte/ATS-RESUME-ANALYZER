import {Link} from 'react-router-dom'
import {
  FiArrowRight,
  FiCheckCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiCpu,
  FiFileText,
  FiShield,
  FiBarChart2,
  FiChevronRight,
} from 'react-icons/fi'

import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#f8faff]">

          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">

            {/* LEFT */}
            <div className="relative z-10">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                  <FiZap className="text-[11px]" />
                </span>

                AI-POWERED RESUME ANALYZER

                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-600">
                  LIVE
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-[-2px] text-slate-950 sm:text-6xl lg:text-[68px]">
                Turn your resume into your
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  competitive advantage.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                Analyze your resume against any job description, discover
                missing skills, measure ATS compatibility, and get personalized
                AI recommendations to improve your chances of getting
                shortlisted.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-700"
                >
                  Analyze My Resume

                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustItem text="Free to get started" />
                <TrustItem text="Instant analysis" />
                <TrustItem text="AI-powered feedback" />
              </div>

              {/* Mini stats */}
              <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-slate-200 pt-7">
                <div>
                  <p className="text-2xl font-black text-slate-900">
                    100%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Resume analysis
                  </p>
                </div>

                <div className="h-9 w-px bg-slate-200" />

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    AI
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Semantic insights
                  </p>
                </div>

                <div className="h-9 w-px bg-slate-200" />

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    ATS
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Compatibility scoring
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT - PRODUCT PREVIEW */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

              {/* Glow */}
              <div className="absolute inset-10 rounded-full bg-blue-400/20 blur-3xl" />

              {/* Floating top badge */}
              <div className="absolute -right-2 -top-5 z-20 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <FiCpu />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Gemini AI
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      Semantic analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Main card */}
              <div className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/40 sm:p-7">

                {/* Browser-like top */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <FiFileText />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Resume Analysis
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        Software Engineer Resume
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-600">
                    EXCELLENT
                  </span>
                </div>

                {/* Score */}
                <div className="py-7 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Overall ATS Score
                  </p>

                  <div className="relative mx-auto mt-5 h-40 w-40">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'conic-gradient(#2563eb 302deg, #dbeafe 302deg)',
                      }}
                    />

                    <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-4xl font-black text-slate-900">
                        84
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        OUT OF 100
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    <FiCheckCircle />
                    Strong match for this role
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <PreviewStat
                    value="84%"
                    label="AI Match"
                    className="bg-purple-50"
                    valueClass="text-purple-600"
                  />

                  <PreviewStat
                    value="12"
                    label="Matched"
                    className="bg-emerald-50"
                    valueClass="text-emerald-600"
                  />

                  <PreviewStat
                    value="4"
                    label="Skill Gaps"
                    className="bg-amber-50"
                    valueClass="text-amber-600"
                  />
                </div>

                {/* AI insight */}
                <div className="mt-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <FiCpu />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        AI Recommendation
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Add FastAPI, RAG and cloud deployment experience to
                        strengthen your profile for this role.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating score improvement */}
              <div className="absolute -bottom-7 -left-4 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <FiTrendingUp />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Potential improvement
                    </p>

                    <p className="text-sm font-black text-slate-900">
                      +18 points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURES
        ========================================================= */}
        <section
          id="features"
          className="relative bg-white px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                Powerful Features
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                Everything you need to
                <span className="text-blue-600"> stand out.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-500 md:text-lg">
                Go beyond keyword matching with a complete resume analysis
                system combining ATS scoring and AI-powered insights.
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<FiTarget />}
                number="01"
                title="ATS Score"
                description="Measure how well your resume matches the requirements of your target role."
              />

              <FeatureCard
                icon={<FiSearch />}
                number="02"
                title="Skill Matching"
                description="Find important skills and keywords that are present or missing from your resume."
              />

              <FeatureCard
                icon={<FiCpu />}
                number="03"
                title="Gemini AI"
                description="Get semantic analysis that understands the context behind your experience."
                featured
              />

              <FeatureCard
                icon={<FiTrendingUp />}
                number="04"
                title="Track Progress"
                description="Keep your previous analyses and see how your resume improves over time."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            AI SECTION
        ========================================================= */}
        <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-8">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
                <FiCpu />
                INTELLIGENT ANALYSIS
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Your resume deserves
                <span className="block text-blue-400">
                  more than keywords.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
                ResumeAI combines deterministic ATS analysis with Gemini
                semantic intelligence to understand your resume in the
                context of the job you're targeting.
              </p>

              <div className="mt-8 space-y-4">
                <DarkFeature
                  icon={<FiTarget />}
                  title="Semantic matching"
                  text="Understand the relationship between your experience and the job requirements."
                />

                <DarkFeature
                  icon={<FiSearch />}
                  title="Skill gap detection"
                  text="Identify technologies and concepts that could strengthen your application."
                />

                <DarkFeature
                  icon={<FiTrendingUp />}
                  title="Personalized recommendations"
                  text="Get practical suggestions tailored to the specific role."
                />
              </div>
            </div>

            {/* AI visualization */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-7">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Gemini Assessment
                    </p>

                    <p className="mt-1 font-bold text-white">
                      Full Stack + GenAI Engineer
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                    <FiCpu />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.06] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Semantic Match
                    </span>

                    <span className="text-2xl font-black text-purple-300">
                      84%
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <DarkInsight
                    title="Strengths"
                    items={['React.js', 'Node.js', 'MongoDB']}
                    positive
                  />

                  <DarkInsight
                    title="Skill Gaps"
                    items={['FastAPI', 'RAG', 'AWS']}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-blue-400/10 bg-blue-500/10 p-4">
                  <p className="text-xs font-bold text-blue-300">
                    AI Recommendation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Strengthen your GenAI profile by adding a project using
                    RAG, embeddings and a vector database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
        ========================================================= */}
        <section
          id="how-it-works"
          className="bg-[#f8faff] px-6 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                Simple Workflow
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                From resume to
                <span className="text-blue-600"> better applications.</span>
              </h2>
            </div>

            <div className="relative mt-16 grid gap-6 md:grid-cols-3">

              <StepCard
                number="01"
                icon={<FiFileText />}
                title="Upload Resume"
                description="Upload your PDF resume and let the system extract the relevant information."
              />

              <StepCard
                number="02"
                icon={<FiTarget />}
                title="Add Job Description"
                description="Paste the job description for the position you're targeting."
              />

              <StepCard
                number="03"
                icon={<FiCpu />}
                title="Get AI Insights"
                description="Receive ATS scores, skill gaps, semantic analysis and personalized recommendations."
              />

            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}
        <section className="px-6 py-24 lg:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-14 text-center shadow-2xl shadow-blue-600/20 sm:px-12">

            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl text-white backdrop-blur">
                <FiZap />
              </div>

              <h2 className="mt-6 text-3xl font-black text-white md:text-5xl">
                Give your resume an unfair advantage.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
                Upload your resume, add your target job description, and
                discover exactly what you can improve.
              </p>

              <Link
                to="/register"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Analyze My Resume

                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FiFileText />
            </div>

            Resume<span className="text-blue-600">AI</span>
          </div>

          <p>
            © 2026 ResumeAI. Built to help job seekers create better resumes.
          </p>
        </div>
      </footer>
    </div>
  )
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

const TrustItem = ({text}) => {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <FiCheckCircle className="text-green-500" />
      {text}
    </div>
  )
}


const PreviewStat = ({
  value,
  label,
  className,
  valueClass,
}) => {
  return (
    <div className={`rounded-2xl p-4 ${className}`}>
      <p className={`text-xl font-black ${valueClass}`}>
        {value}
      </p>

      <p className="mt-1 text-[10px] font-medium text-slate-500">
        {label}
      </p>
    </div>
  )
}


const FeatureCard = ({
  icon,
  number,
  title,
  description,
  featured = false,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
            featured
              ? 'bg-purple-600 text-white'
              : 'bg-blue-50 text-blue-600'
          }`}
        >
          {icon}
        </div>

        <span className="text-xs font-black text-slate-200">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
        Learn more
        <FiChevronRight />
      </div>
    </div>
  )
}


const DarkFeature = ({icon, title, text}) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  )
}


const DarkInsight = ({
  title,
  items,
  positive = false,
}) => {
  return (
    <div className="rounded-2xl bg-white/[0.06] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            positive ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />

        <p className="text-xs font-bold text-slate-300">
          {title}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item}
            className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}


const StepCard = ({
  number,
  icon,
  title,
  description,
}) => {
  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
          {icon}
        </div>

        <span className="text-5xl font-black tracking-tight text-slate-100 transition group-hover:text-blue-50">
          {number}
        </span>
      </div>

      <h3 className="mt-7 text-xl font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
        Step {number}
        <FiArrowRight />
      </div>
    </div>
  )
}

export default Home