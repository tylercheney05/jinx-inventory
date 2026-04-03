import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { CreateInventoryLog, InventoryLog, UpdateInventoryLog } from '@/types/inventoryLogs'

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
    getInventoryLogsList: builder.query<InventoryLog[], Record<string, string | boolean> | void>({
      query: (params) => {
        const searchParams = new URLSearchParams()
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value))
          })
        }
        return `/inventory/logs/?${searchParams.toString()}`
      },
      providesTags: ['InventoryLog'],
    }),
    updateInventoryLog: builder.mutation<InventoryLog, UpdateInventoryLog>({
      query: ({ id, ...body }) => ({
        url: `/inventory/logs/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['InventoryLog'],
    }),
  }),
})

export const { useCreateInventoryLogMutation, useGetInventoryLogsListQuery, useUpdateInventoryLogMutation } = inventoryLogsApi
