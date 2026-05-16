import { LoadingIcon } from '@/components/Icons'
import LogItemCard from '@/components/log/LogItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface LogItemGridProps {
  items: InventoryItem[]
  isLoading: boolean
  isError: boolean
  onRestockClick: (item: InventoryItem) => void
  onRemoveClick: (item: InventoryItem) => void
}

const LogItemGrid = ({ items, isLoading, isError, onRestockClick, onRemoveClick }: LogItemGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingIcon className="text-jinxBlue" size={32} />
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
        <LogItemCard
          key={item.id}
          item={item}
          onRestockClick={() => onRestockClick(item)}
          onRemoveClick={() => onRemoveClick(item)}
        />
      ))}
    </div>
  )
}

export default LogItemGrid
