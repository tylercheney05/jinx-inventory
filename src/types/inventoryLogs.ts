export interface InventoryLog {
  id: number
  inventory_item: number
  quantity: number
  purchase_date: string  // YYYY-MM-DD
  received_date: string | null  // YYYY-MM-DD
  note: string
}

export interface CreateInventoryLog {
  inventory_item: number
  quantity: number
  purchase_date: string  // YYYY-MM-DD
  received_date?: string | null  // YYYY-MM-DD
  note?: string
}
