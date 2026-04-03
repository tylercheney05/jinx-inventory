import InventoryItemCard from '@/components/inventory/InventoryItemCard'
import { Badge } from '@/components/ui/badge'
import type { InventoryItem } from '@/types/inventoryItems'

interface InventoryTableProps {
  items: InventoryItem[]
}

const InventoryTable = ({ items }: InventoryTableProps) => {
  return (
    <>
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-3 px-4 font-medium">Category</th>
            <th className="py-3 px-4 font-medium">SKU</th>
            <th className="py-3 px-4 font-medium">Name</th>
            <th className="py-3 px-4 font-medium">Unit Size</th>
            <th className="py-3 px-4 font-medium text-right">Reorder Point</th>
            <th className="py-3 px-4 font-medium text-right">On Hand</th>
            <th className="py-3 px-4 font-medium text-right">In Transit</th>
            <th className="py-3 px-4 font-medium text-right">Min Order</th>
            <th className="py-3 px-4 font-medium text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b even:bg-gray-50">
              <td className="py-3 px-4">{item.category.name}</td>
              <td className="py-3 px-4 font-mono text-xs">{item.sku}</td>
              <td className="py-3 px-4 font-medium">{item.name}</td>
              <td className="py-3 px-4">
                {item.unit_size} {item.uom}
              </td>
              <td className="py-3 px-4 text-right">{item.reorder_point}</td>
              <td className="py-3 px-4 text-right font-semibold">{item.on_hand_qty}</td>
              <td className="py-3 px-4 text-right">{item.in_transit_qty}</td>
              <td className="py-3 px-4 text-right">{item.min_order_qty}</td>
              <td className="py-3 px-4 text-center">
                {item.reorder_status === 'do_not_order' ? (
                  <Badge variant="secondary">DO NOT ORDER</Badge>
                ) : item.reorder_status === 'ok' ? (
                  <Badge variant="success">OK</Badge>
                ) : item.reorder_status === 'ordered' ? (
                  <Badge variant="info">ORDERED</Badge>
                ) : item.reorder_status === 'reorder' ? (
                  <Badge variant="destructive">REORDER</Badge>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((item) => (
          <InventoryItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default InventoryTable
