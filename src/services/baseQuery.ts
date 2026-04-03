import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { RootState } from '@/store'
import { setTokens, logoutUser } from '@/features/user'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      api.dispatch(logoutUser())
      return result
    }

    const refreshResult = await baseQuery(
      { url: '/token/refresh/', method: 'POST', body: { refresh: refreshToken } },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { access } = refreshResult.data as { access: string }
      api.dispatch(setTokens({ accessToken: access }))
      sessionStorage.setItem('accessToken', access)
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logoutUser())
    }
  }

  return result
}

export { baseQueryWithReauth }
