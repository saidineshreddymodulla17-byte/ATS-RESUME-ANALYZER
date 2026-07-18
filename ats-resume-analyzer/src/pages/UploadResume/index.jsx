import {useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  FiFileText,
  FiUploadCloud,
  FiX,
  FiArrowRight,
  FiBriefcase,
  FiInfo,
} from 'react-icons/fi'

import DashboardLayout from '../../components/DashboardLayout'

const UploadResume = () => {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const validateAndSetFile = file => {
    if (!file) {
      return
    }

    // Currently, the backend supports only PDF files
    if (file.type !== 'application/pdf') {
      alert('Please upload only a PDF file.')
      return
    }

    const maximumFileSize = 5 * 1024 * 1024

    if (file.size > maximumFileSize) {
      alert('File size must be less than 5 MB.')
      return
    }

    setResume(file)
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    validateAndSetFile(file)
  }

  const handleDragOver = event => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = event => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = event => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]
    validateAndSetFile(file)
  }

  const removeResume = () => {
    setResume(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = async event => {
    event.preventDefault()

    console.log('Analyze button clicked')

    if (!resume) {
      alert('Please upload your resume.')
      return
    }

    if (!jobDescription.trim()) {
      alert('Please enter a job description.')
      return
    }

    const token = localStorage.getItem('token')

    console.log('Token exists:', Boolean(token))

    if (!token) {
      alert('Your session has expired. Please log in again.')
      navigate('/login')
      return
    }

    try {
      setIsLoading(true)

      const formData = new FormData()

      formData.append('resume', resume)
      formData.append('jobDescription', jobDescription)

      console.log('Sending request to backend...')
      console.log('Resume file:', resume.name)
      console.log('Resume size:', resume.size)
      console.log('Job description length:', jobDescription.length)

      const response = await fetch(
        'https://ats-resume-analyzer-backend-nel5.onrender.com/api/resumes/upload',
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      )

      console.log('Response status:', response.status)

      const data = await response.json()

      console.log('Complete backend response:', data)

      if (data.resumeText) {
        console.log('\n========== EXTRACTED RESUME TEXT ==========\n')
        console.log(data.resumeText)
        console.log('\n===========================================\n')
      } else {
        console.log('No resumeText received from backend')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload resume')
      }

      alert(data.message)

      navigate('/analysis', {
        state: {
          uploadData: data,
        },
      })
    } catch (error) {
      console.error('Resume upload error:', error)

      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formatFileSize = bytes => {
    return (bytes / (1024 * 1024)).toFixed(2)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Resume Analysis
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Analyze your resume
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Upload your resume and paste the target job description to get your
            ATS score, keyword matches, missing skills, and AI-powered
            recommendations.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="mt-8 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                <FiFileText />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Upload your resume
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Supported format: PDF. Maximum file size: 5 MB.
                </p>
              </div>
            </div>

            {!resume ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">
                  <FiUploadCloud />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Drag and drop your resume here
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  or click the button below to browse your files
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-5 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
                >
                  Choose Resume
                </button>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
                  <FiFileText />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {resume.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatFileSize(resume.size)} MB • Ready for analysis
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeResume}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-100 hover:text-red-600"
                  aria-label="Remove resume"
                >
                  <FiX />
                </button>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl text-purple-600">
                <FiBriefcase />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add job description
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Paste the complete job description for the role you're
                  applying to.
                </p>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={event => setJobDescription(event.target.value)}
              rows="12"
              placeholder="Paste the job description here...

Example:

We are looking for a Software Engineer with experience in React, Node.js, MongoDB, REST APIs, Git, and cloud technologies..."
              className="mt-6 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>
                Include responsibilities, requirements, and preferred skills.
              </span>

              <span>{jobDescription.length} characters</span>
            </div>
          </section>

          <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <FiInfo className="mt-0.5 shrink-0 text-blue-600" />

            <p className="text-sm leading-6 text-blue-700">
              Your resume will be compared against the job description to
              calculate keyword compatibility and generate AI-powered
              improvement suggestions.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 sm:w-auto"
            >
              {isLoading ? 'Uploading...' : 'Analyze My Resume'}

              {!isLoading && <FiArrowRight />}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default UploadResume