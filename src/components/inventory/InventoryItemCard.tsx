import type { ReactNode } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { InventoryItem } from '@/types/inventoryItems'

interface InventoryItemCardProps {
  item: InventoryItem
  footer?: ReactNode
}

const InventoryItemCard = ({ item, footer }: InventoryItemCardProps) => (
  <Card className="relative flex flex-col justify-between">
    {item.reorder_status === 'do_not_order' ? (
      <Badge variant="secondary" className="absolute top-3 right-3">DO NOT ORDER</Badge>
    ) : item.reorder_status === 'ok' ? (
      <Badge variant="success" className="absolute top-3 right-3">OK</Badge>
    ) : item.reorder_status === 'ordered' ? (
      <Badge variant="info" className="absolute top-3 right-3">ORDERED</Badge>
    ) : item.reorder_status === 'reorder' ? (
      <Badge variant="destructive" className="absolute top-3 right-3">REORDER</Badge>
    ) : null}
    <CardContent className="pt-6 space-y-1">
      <p className="font-semibold text-base leading-tight">{item.name}</p>
      <p className="text-sm text-muted-foreground">{item.category.name}</p>
      <div className="pt-2 space-y-0.5 text-sm text-gray-600">
        <p>SKU: {item.sku}</p>
        <p>Size: {item.unit_size} {item.uom}</p>
        <p>Reorder at: {item.reorder_point}</p>
        <p>On Hand: {item.on_hand_qty}</p>
        <p>In Transit: {item.in_transit_qty}</p>
        <p>Min Order: {item.min_order_qty}</p>
      </div>
    </CardContent>
    {footer && <CardFooter className="pt-2">{footer}</CardFooter>}
  </Card>
)

export default InventoryItemCard
