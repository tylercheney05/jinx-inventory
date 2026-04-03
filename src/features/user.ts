import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/lib/axios'
import type { AuthState, LoginProps, MeProps } from '@/types/user'

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
  try {
    const res = await api.get<MeProps>('/users/me')
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }: LoginProps, thunkAPI) => {
    try {
      const res = await api.post<{ access: string; refresh: string }>('/token/', { email, password })
      const { access, refresh } = res.data

      sessionStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

      thunkAPI.dispatch(setTokens({ accessToken: access }))
      thunkAPI.dispatch(getUser())
      return { access }
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const checkAuth = createAsyncThunk('users/verify', async (_, thunkAPI) => {
  const accessToken = sessionStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (!accessToken && !refreshToken) {
    return thunkAPI.rejectWithValue('No tokens')
  }

  if (accessToken) {
    thunkAPI.dispatch(setTokens({ accessToken }))
  }

  try {
    const res = await api.get<MeProps>('/users/me')
    return res.data
  } catch (err) {
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('accessToken')
    return thunkAPI.rejectWithValue(err)
  }
})

export const logoutUser = createAsyncThunk('users/logout', async () => {
  sessionStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
})

const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  loading: false,
  error: null,
  accessToken: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.accessToken = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.accessToken = null
      })
  },
})

export const { setTokens } = userSlice.actions
export default userSlice.reducer
