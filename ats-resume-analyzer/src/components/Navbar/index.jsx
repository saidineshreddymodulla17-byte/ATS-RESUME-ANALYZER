import {Link} from 'react-router-dom'
import {FiFileText} from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FiFileText className="text-xl" />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Resume<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            How It Works
          </a>

          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar