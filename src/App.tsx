import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store'
import { checkAuth } from '@/features/user'
import LoginPage from '@/containers/LoginPage'
import HomePage from '@/containers/HomePage'
import SettingsPage from '@/containers/SettingsPage'
import RestockPage from '@/containers/RestockPage'
import RemovalPage from '@/containers/RemovalPage'
import InTransitPage from '@/containers/InTransitPage'
import CurrentInventoryPage from '@/containers/CurrentInventoryPage'
import ProtectedRoute from '@/components/routes/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <CurrentInventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/in-transit"
          element={
            <ProtectedRoute>
              <InTransitPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restock"
          element={
            <ProtectedRoute>
              <RestockPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/removal"
          element={
            <ProtectedRoute>
              <RemovalPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
