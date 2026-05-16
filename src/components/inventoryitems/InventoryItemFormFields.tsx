import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InventoryItemFormFieldsProps<T extends FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any, any>
}

const InventoryItemFormFields = <T extends FieldValues>({
  control,
}: InventoryItemFormFieldsProps<T>) => {
  const { data: categories } = useGetInventoryCategoriesListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={'name' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter item name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={'sku' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter SKU" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name={'category' as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
              )}
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name={'uom' as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Unit of Measure</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ct">Count</SelectItem>
                  <SelectItem value="oz">Ounce</SelectItem>
                  <SelectItem value="gal">Gallon</SelectItem>
                  <SelectItem value="mL">Milliliter</SelectItem>
                  <SelectItem value="L">Liter</SelectItem>
                  <SelectItem value="QT">Quart</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
              )}
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <FormField
          control={control}
          name={'unit_size' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Size</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={'reorder_point' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reorder Point</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={'order_cost' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Cost ($)</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0.00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={'order_count' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Count</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default InventoryItemFormFields
