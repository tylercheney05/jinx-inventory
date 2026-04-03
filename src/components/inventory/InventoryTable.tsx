import InventoryItemCard from '@/components/inventory/InventoryItemCard'
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
            <th className="py-3 px-4 font-medium text-right">On Hand</th>
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
              <td className="py-3 px-4 text-right font-semibold">{item.on_hand_qty}</td>
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
