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
