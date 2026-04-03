export interface MeProps {
  id: number
  first_name: string
  last_name: string
  email: string
  is_admin: boolean
  is_staff: boolean
}

export interface LoginProps {
  email: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean | null
  user: MeProps | null
  loading: boolean
  error: string | null
  accessToken: string | null
}
