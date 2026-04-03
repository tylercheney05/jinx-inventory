import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { InventoryCategory } from '@/types/inventoryCategories'

export const inventoryCategoriesApi = createApi({
  reducerPath: 'inventoryCategoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['InventoryCategory'],
  endpoints: (builder) => ({
    createInventoryCategory: builder.mutation<InventoryCategory, { name: string }>({
      query: ({ name }) => ({
        url: '/inventory/categories/',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['InventoryCategory'],
    }),
    getInventoryCategoriesList: builder.query<InventoryCategory[], void>({
      query: () => '/inventory/categories/',
      providesTags: ['InventoryCategory'],
    }),
  }),
})

export const { useCreateInventoryCategoryMutation, useGetInventoryCategoriesListQuery } = inventoryCategoriesApi
