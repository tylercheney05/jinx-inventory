import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import ResourceList from '@/components/shared/ResourceList'

const InventoryItemList = () => {
  const { data, isLoading, isError } = useGetInventoryItemsListQuery(undefined, { refetchOnMountOrArgChange: true })

  return (
    <ResourceList
      title="Existing Items"
      emptyMessage="No items yet."
      errorMessage="Failed to load inventory items."
      isLoading={isLoading}
      isError={isError}
      data={data}
      getKey={(item) => item.id}
      renderItem={(item) => (
        <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2 px-3 py-2 rounded-md border bg-white text-sm">
          <span className="font-medium truncate">{item.name}</span>
          <span className="text-muted-foreground truncate">{item.category.name}</span>
          <span className="text-muted-foreground">{item.sku}</span>
          <span className="text-muted-foreground">{item.unit_size} {item.uom}</span>
        </div>
      )}
    />
  )
}

export default InventoryItemList
