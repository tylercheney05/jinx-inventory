import { useState, useCallback } from 'react'
import Layout from '@/components/Layout'
import CategorySidebar from '@/components/restock/CategorySidebar'
import LogItemGrid from '@/components/log/LogItemGrid'
import RestockModal from '@/components/restock/RestockModal'
import RemovalModal from '@/components/removal/RemovalModal'
import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'
import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import type { InventoryItem } from '@/types/inventoryItems'

const LogPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<number>>(new Set())
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null)
  const [removalItem, setRemovalItem] = useState<InventoryItem | null>(null)

  const { data: categories = [] } = useGetInventoryCategoriesListQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data: items = [], isLoading, isError } = useGetInventoryItemsListQuery({ is_active: true }, { refetchOnMountOrArgChange: true })

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
        <h1 className="text-2xl font-bold text-[#0B1220] my-6">Log</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <CategorySidebar
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
          />
          <div className="flex-1 min-w-0">
            <LogItemGrid
              items={filteredItems}
              isLoading={isLoading}
              isError={isError}
              onRestockClick={setRestockItem}
              onRemoveClick={setRemovalItem}
            />
          </div>
        </div>
      </div>

      <RestockModal item={restockItem} onClose={() => setRestockItem(null)} />
      <RemovalModal item={removalItem} onClose={() => setRemovalItem(null)} />
    </Layout>
  )
}

export default LogPage
