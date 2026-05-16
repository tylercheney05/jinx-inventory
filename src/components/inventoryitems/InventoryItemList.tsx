import { useState } from 'react'
import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import ResourceList from '@/components/shared/ResourceList'
import EditInventoryItemSheet from './EditInventoryItemSheet'
import type { InventoryItem } from '@/types/inventoryItems'

const InventoryItemList = () => {
  const { data, isLoading, isError } = useGetInventoryItemsListQuery(undefined, { refetchOnMountOrArgChange: true })
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  return (
    <>
      <ResourceList
        title="Existing Items"
        emptyMessage="No items yet."
        errorMessage="Failed to load inventory items."
        isLoading={isLoading}
        isError={isError}
        data={data}
        getKey={(item) => item.id}
        renderItem={(item) => (
          <button
            type="button"
            onClick={() => setSelectedItem(item)}
            className="w-full text-left grid grid-cols-2 sm:grid-cols-4 items-center gap-2 px-3 py-2 rounded-md border bg-white text-sm hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <span className="font-medium truncate">{item.name}</span>
            <span className="text-muted-foreground truncate">{item.category.name}</span>
            <span className="text-muted-foreground">{item.sku}</span>
            <span className="text-muted-foreground">{item.unit_size} {item.uom}</span>
          </button>
        )}
      />
      <EditInventoryItemSheet
        item={selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null)
        }}
      />
    </>
  )
}

export default InventoryItemList
