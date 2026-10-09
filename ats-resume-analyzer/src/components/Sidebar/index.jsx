import {NavLink, Link, useNavigate} from 'react-router-dom'
import {
  FiFileText,
  FiGrid,
  FiUploadCloud,
  FiClock,
  FiLogOut,
  FiChevronRight,
  FiZap,
} from 'react-icons/fi'

const Sidebar = () => {
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FiGrid />,
    },
    {
      name: 'Upload Resume',
      path: '/upload',
      icon: <FiUploadCloud />,
    },
    {
      name: 'Analysis History',
      path: '/history',
      icon: <FiClock />,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[270px] flex-col bg-[#111827] px-4 py-5 text-white lg:flex">

      {/* Logo */}
      <Link
        to="/"
        className="mb-8 flex items-center gap-3 rounded-2xl px-3 py-2"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <FiFileText className="text-xl" />
        </div>

        <div>
          <div className="text-lg font-bold tracking-tight">
            Resume<span className="text-blue-400">AI</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Smart Resume Analyzer
          </div>
        </div>
      </Link>

      {/* AI badge */}
      <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            <FiZap />
          </div>

          <div>
            <p className="text-xs font-semibold text-white">
              AI Powered
            </p>
            <p className="text-[10px] text-slate-400">
              Gemini Resume Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        Workspace
      </div>

      <nav className="space-y-1.5">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
              }`
            }
          >
            {({isActive}) => (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {item.icon}
                  </span>

                  {item.name}
                </div>

                {isActive && (
                  <FiChevronRight className="text-sm opacity-80" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="mb-4 h-px bg-white/10" />

        <div className="mb-3 rounded-xl bg-white/[0.04] px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
              AI
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                Resume Analyzer
              </p>

              <p className="truncate text-[10px] text-slate-500">
                AI Career Assistant
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar