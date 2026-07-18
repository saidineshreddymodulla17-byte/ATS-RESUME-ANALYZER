import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    // Frontend validation
    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch(
       'https://ats-resume-analyzer-backend-nel5.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Save JWT token
      localStorage.setItem('token', data.token)

      // Save logged-in user information
      localStorage.setItem('user', JSON.stringify(data.user))

      // Navigate to dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)

      setError(
        'Unable to connect to the server. Make sure the backend is running.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Project Name */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              ATS Resume
              <span className="text-blue-500"> Analyzer</span>
            </h1>
          </Link>

          <p className="text-slate-400 mt-2">
            Sign in to continue improving your resume
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Welcome back
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Home link */}
        <p className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-slate-500 transition hover:text-slate-300"
          >
            ← Back to home
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login