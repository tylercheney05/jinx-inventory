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
      <table className="hidden md:table w-full text-sm bg-white rounded-xl border border-[#E4E8EE] overflow-hidden">
        <thead>
          <tr className="border-b border-[#EEF2F7] text-left">
            <th className="py-2.5 px-4 font-medium text-[#5B6470]">Category</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470]">SKU</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470]">Name</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470]">Unit Size</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470] text-right">Reorder Point</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470] text-right">On Hand</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470] text-right">In Transit</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470] text-right">Min Order</th>
            <th className="py-2.5 px-4 font-medium text-[#5B6470] text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-[#EEF2F7] even:bg-[#F9FAFC]">
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
