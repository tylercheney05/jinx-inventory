import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { CreateInventoryItem, InventoryItem } from '@/types/inventoryItems'

export const inventoryItemsApi = createApi({
  reducerPath: 'inventoryItemsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['InventoryItem'],
  endpoints: (builder) => ({
    createInventoryItem: builder.mutation<InventoryItem, CreateInventoryItem>({
      query: (body) => ({
        url: '/inventory/items/',
        method: 'POST',
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

export const { useCreateInventoryItemMutation, useGetInventoryItemsListQuery } = inventoryItemsApi
