import type { InventoryCategory } from '@/types/inventoryCategories'

export interface InventoryItem {
  id: number
  name: string
  category: InventoryCategory
  sku: string
  unit_size: number
  uom: string
  reorder_point: number
  order_cost: string
  order_count: number
  on_hand_qty: number
  in_transit_qty: number
  min_order_qty: number
  reorder_status: 'ok' | 'do_not_order' | 'ordered' | 'reorder' | null
}

export interface CreateInventoryItem {
  name: string
  category: number
  sku: string
  unit_size: number
  uom: string
  reorder_point: number
  order_cost: string
  order_count: number
}
