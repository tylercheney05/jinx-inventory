import { useState, useCallback } from 'react'
import Layout from '@/components/Layout'
import CategorySidebar from '@/components/restock/CategorySidebar'
import RemovalItemGrid from '@/components/removal/RemovalItemGrid'
import RemovalModal from '@/components/removal/RemovalModal'
import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'
import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import type { InventoryItem } from '@/types/inventoryItems'

const RemovalPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<number>>(new Set())
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const { data: categories = [] } = useGetInventoryCategoriesListQuery(undefined, { refetchOnMountOrArgChange: true })
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
        <h1 className="text-2xl font-bold text-gray-800 my-6">Removal</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <CategorySidebar
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
            activeColor="bg-jinxRed"
          />
          <div className="flex-1 min-w-0">
            <RemovalItemGrid
              items={filteredItems}
              isLoading={isLoading}
              isError={isError}
              onRemoveClick={setSelectedItem}
            />
          </div>
        </div>
      </div>

      <RemovalModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </Layout>
  )
}

export default RemovalPage
