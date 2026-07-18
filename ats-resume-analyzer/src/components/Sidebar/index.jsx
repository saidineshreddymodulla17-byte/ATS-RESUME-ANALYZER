import {NavLink, Link, useNavigate} from 'react-router-dom'
import {
  FiFileText,
  FiGrid,
  FiUploadCloud,
  FiClock,
  FiLogOut,
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
      name: 'History',
      path: '/history',
      icon: <FiClock />,
    },
  ]

  const getNavLinkClass = ({isActive}) => {
    const baseClasses =
      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition'

    return isActive
      ? `${baseClasses} bg-blue-50 text-blue-600`
      : `${baseClasses} text-slate-600 hover:bg-slate-50 hover:text-slate-900`
  }

  const handleLogout = () => {
    // Remove JWT token
    localStorage.removeItem('token')

    // Remove stored user information
    localStorage.removeItem('user')

    // Redirect to login page
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
      <Link to="/" className="flex items-center gap-2 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <FiFileText className="text-xl" />
        </div>

        <span className="text-xl font-bold text-slate-900">
          Resume<span className="text-blue-600">AI</span>
        </span>
      </Link>

      <nav className="mt-10 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={getNavLinkClass}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar