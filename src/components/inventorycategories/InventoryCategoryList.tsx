import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'
import ResourceList from '@/components/shared/ResourceList'

const InventoryCategoryList = () => {
  const { data, isLoading, isError } = useGetInventoryCategoriesListQuery(undefined, { refetchOnMountOrArgChange: true })

  return (
    <ResourceList
      title="Existing Categories"
      emptyMessage="No categories yet."
      errorMessage="Failed to load inventory categories."
      isLoading={isLoading}
      isError={isError}
      data={data}
      getKey={(category) => category.id}
      renderItem={(category) => (
        <div className="flex items-center h-10 px-3 rounded-md border bg-white text-sm">
          {category.name}
        </div>
      )}
    />
  )
}

export default InventoryCategoryList
