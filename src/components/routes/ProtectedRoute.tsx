import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '@/store'
import PageLoading from '@/components/PageLoading'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const location = useLocation()

  if (isAuthenticated === null) return <PageLoading />
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}

export default ProtectedRoute
