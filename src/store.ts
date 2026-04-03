import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '@/features/user'
import { inventoryCategoriesApi } from '@/services/inventoryCategories'
import { inventoryItemsApi } from '@/services/inventoryItems'
import { inventoryLogsApi } from '@/services/inventoryLogs'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [inventoryCategoriesApi.reducerPath]: inventoryCategoriesApi.reducer,
    [inventoryItemsApi.reducerPath]: inventoryItemsApi.reducer,
    [inventoryLogsApi.reducerPath]: inventoryLogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryCategoriesApi.middleware, inventoryItemsApi.middleware, inventoryLogsApi.middleware),
  devTools: import.meta.env.DEV,
})

setupListeners(store.dispatch)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
