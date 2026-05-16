import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { WriteableInventoryItem, InventoryItem } from '@/types/inventoryItems'

export const inventoryItemsApi = createApi({
  reducerPath: 'inventoryItemsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['InventoryItem'],
  endpoints: (builder) => ({
    createInventoryItem: builder.mutation<InventoryItem, WriteableInventoryItem>({
      query: (body) => ({
        url: '/inventory/items/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['InventoryItem'],
    }),
    updateInventoryItem: builder.mutation<InventoryItem, { id: number } & Partial<WriteableInventoryItem>>({
      query: ({ id, ...body }) => ({
        url: `/inventory/items/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['InventoryItem'],
    }),
    getInventoryItemsList: builder.query<InventoryItem[], void>({
      query: () => '/inventory/items/',
      providesTags: ['InventoryItem'],
    }),
  }),
})

export const {
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useGetInventoryItemsListQuery,
} = inventoryItemsApi
