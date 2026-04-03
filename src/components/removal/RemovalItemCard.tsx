import { Button } from '@/components/ui/button'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface RemovalItemCardProps {
  item: InventoryItem
  onRemoveClick: () => void
}

const RemovalItemCard = ({ item, onRemoveClick }: RemovalItemCardProps) => (
  <InventoryItemCard
    item={item}
    footer={
      <Button className="w-full bg-jinxRed hover:bg-jinxRed/90" onClick={onRemoveClick}>
        Remove
      </Button>
    }
  />
)

export default RemovalItemCard
