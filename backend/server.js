const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express()

// Connect MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('ATS Resume Analyzer API is running')
})

// Authentication routes
app.use('/api/auth', authRoutes)

// Resume routes
app.use('/api/resumes', resumeRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})