import { LoadingIcon } from '@/components/Icons'
import RemovalItemCard from '@/components/removal/RemovalItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface RemovalItemGridProps {
  items: InventoryItem[]
  isLoading: boolean
  isError: boolean
  onRemoveClick: (item: InventoryItem) => void
}

const RemovalItemGrid = ({ items, isLoading, isError, onRemoveClick }: RemovalItemGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingIcon className="text-jinxRed" size={32} />
      </div>
    )
  }

  if (isError) {
    return <p className="text-center text-sm text-red-500 py-12">Failed to load inventory items.</p>
  }

  if (items.length === 0) {
    return <p className="text-center text-sm text-muted-foreground py-12">No items found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <RemovalItemCard key={item.id} item={item} onRemoveClick={() => onRemoveClick(item)} />
      ))}
    </div>
  )
}

export default RemovalItemGrid
