import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-8xl font-bold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-slate-900">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound