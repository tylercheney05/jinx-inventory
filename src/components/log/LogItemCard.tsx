import { Button } from '@/components/ui/button'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface LogItemCardProps {
  item: InventoryItem
  onRestockClick: () => void
  onRemoveClick: () => void
}

const LogItemCard = ({ item, onRestockClick, onRemoveClick }: LogItemCardProps) => (
  <InventoryItemCard
    item={item}
    footer={
      <div className="flex gap-2 w-full">
        <Button className="flex-1 bg-jinxBlue hover:bg-jinxBlue/90" onClick={onRestockClick}>
          Log Restock
        </Button>
        <Button className="flex-1 bg-jinxRed hover:bg-jinxRed/90" onClick={onRemoveClick}>
          Log Removal
        </Button>
      </div>
    }
  />
)

export default LogItemCard
