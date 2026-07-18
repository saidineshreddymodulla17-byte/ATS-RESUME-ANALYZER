import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadResume from './pages/UploadResume'
import History from './pages/History'
import Analysis from './pages/Analysis'
import NotFound from './pages/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
     <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/upload" element={<UploadResume />} />
  <Route path="/history" element={<History />} />

  {/* After uploading */}
  <Route path="/analysis" element={<Analysis />} />

  {/* From History page */}
  <Route path="/analysis/:id" element={<Analysis />} />
</Route>
      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App