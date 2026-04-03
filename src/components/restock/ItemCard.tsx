import { Button } from '@/components/ui/button'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import type { InventoryItem } from '@/types/inventoryItems'

interface ItemCardProps {
  item: InventoryItem
  onRestockClick: () => void
}

const ItemCard = ({ item, onRestockClick }: ItemCardProps) => (
  <InventoryItemCard
    item={item}
    footer={
      <Button className="w-full bg-jinxBlue hover:bg-jinxBlue/90" onClick={onRestockClick}>
        Restock
      </Button>
    }
  />
)

export default ItemCard
