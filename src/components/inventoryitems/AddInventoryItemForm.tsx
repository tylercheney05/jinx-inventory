import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInventoryItemMutation } from '@/services/inventoryItems'
import AddForm from '@/components/shared/AddForm'
import InventoryItemFormFields from './InventoryItemFormFields'

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
      <InventoryItemFormFields control={form.control} />
    </AddForm>
  )
}

export default AddInventoryItemForm
