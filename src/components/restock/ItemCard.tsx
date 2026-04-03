import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { InventoryItem } from '@/types/inventoryItems'

interface ItemCardProps {
  item: InventoryItem
  onRestockClick: () => void
}

const ItemCard = ({ item, onRestockClick }: ItemCardProps) => (
  <Card className="flex flex-col justify-between">
    <CardContent className="pt-6 space-y-1">
      <p className="font-semibold text-base leading-tight">{item.name}</p>
      <p className="text-sm text-muted-foreground">{item.category.name}</p>
      <div className="pt-2 space-y-0.5 text-sm text-gray-600">
        <p>SKU: {item.sku}</p>
        <p>Size: {item.unit_size} {item.uom}</p>
        <p>Reorder at: {item.reorder_point}</p>
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <Button className="w-full bg-jinxBlue hover:bg-jinxBlue/90" onClick={onRestockClick}>
        Restock
      </Button>
    </CardFooter>
  </Card>
)

export default ItemCard
