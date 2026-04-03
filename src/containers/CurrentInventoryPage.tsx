import { useState, useCallback } from 'react'
import Layout from '@/components/Layout'
import { LoadingIcon } from '@/components/Icons'
import InventoryTable from '@/components/inventory/InventoryTable'
import CategorySidebar from '@/components/restock/CategorySidebar'
import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'

const CurrentInventoryPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<number>>(new Set())
  const { data: categories = [] } = useGetInventoryCategoriesListQuery()
  const { data: items = [], isLoading, isError } = useGetInventoryItemsListQuery(undefined, { refetchOnMountOrArgChange: true })

  const handleToggle = useCallback((id: number) => {
    setSelectedCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedCategoryIds(new Set())
  }, [])

  const filteredItems =
    selectedCategoryIds.size === 0
      ? items
      : items.filter((item) => selectedCategoryIds.has(item.category.id))

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 my-6">Current Inventory</h1>

        <div className="md:hidden mb-4">
          <CategorySidebar
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingIcon />
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">Failed to load inventory items.</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No inventory items found.</p>
        ) : (
          <InventoryTable items={filteredItems} />
        )}
      </div>
    </Layout>
  )
}

export default CurrentInventoryPage
