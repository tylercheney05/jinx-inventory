import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { CreateInventoryLog, InventoryLog } from '@/types/inventoryLogs'

export const inventoryLogsApi = createApi({
  reducerPath: 'inventoryLogsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['InventoryLog'],
  endpoints: (builder) => ({
    createInventoryLog: builder.mutation<InventoryLog, CreateInventoryLog>({
      query: (body) => ({
        url: '/inventory/logs/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['InventoryLog'],
    }),
    getInventoryLogsList: builder.query<InventoryLog[], void>({
      query: () => '/inventory/logs/',
      providesTags: ['InventoryLog'],
    }),
  }),
})

export const { useCreateInventoryLogMutation, useGetInventoryLogsListQuery } = inventoryLogsApi
