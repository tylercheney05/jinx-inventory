import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInventoryItemMutation } from '@/services/inventoryItems'
import { useGetInventoryCategoriesListQuery } from '@/services/inventoryCategories'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AddForm from '@/components/shared/AddForm'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  category: z.number({ message: 'Category is required' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  unit_size: z.coerce.number().int().positive({ message: 'Unit size must be a positive integer' }),
  uom: z.string().min(1, { message: 'Unit of measure is required' }),
  reorder_point: z.coerce.number().int().positive({ message: 'Reorder point must be a positive integer' }),
  order_cost: z.coerce.number().positive({ message: 'Order cost must be a positive number' }),
  order_count: z.coerce.number().int().positive({ message: 'Order count must be a positive integer' }),
})

const AddInventoryItemForm = () => {
  const [createInventoryItem, result] = useCreateInventoryItemMutation()
  const { data: categories } = useGetInventoryCategoriesListQuery()

  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: '',
      category: undefined,
      sku: '',
      unit_size: '' as unknown as number,
      uom: '',
      reorder_point: '' as unknown as number,
      order_cost: '' as unknown as number,
      order_count: '' as unknown as number,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInventoryItem({ ...values, order_cost: String(values.order_cost) })
  }

  return (
    <AddForm
      title="Add Inventory Item"
      buttonText="Add Item"
      successMessage="Inventory item created successfully!"
      errorMessage="Failed to create inventory item. Please try again."
      form={form}
      result={result}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
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
          control={form.control}
          name="sku"
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
          control={form.control}
          name="category"
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
          control={form.control}
          name="uom"
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
          control={form.control}
          name="unit_size"
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
          control={form.control}
          name="reorder_point"
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
          control={form.control}
          name="order_cost"
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
          control={form.control}
          name="order_count"
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
    </AddForm>
  )
}

export default AddInventoryItemForm
