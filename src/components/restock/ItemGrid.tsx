import { LoadingIcon } from '@/components/Icons'
import ItemCard from '@/components/restock/ItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface ItemGridProps {
  items: InventoryItem[]
  isLoading: boolean
  isError: boolean
  onRestockClick: (item: InventoryItem) => void
}

const ItemGrid = ({ items, isLoading, isError, onRestockClick }: ItemGridProps) => {
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
        <ItemCard key={item.id} item={item} onRestockClick={() => onRestockClick(item)} />
      ))}
    </div>
  )
}

export default ItemGrid
