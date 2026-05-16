import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInventoryItemMutation } from '@/services/inventoryItems'
import AddForm from '@/components/shared/AddForm'
import InventoryItemFormFields, {
  inventoryItemFormSchema,
  type InventoryItemFormValues,
} from './InventoryItemFormFields'

const AddInventoryItemForm = () => {
  const [createInventoryItem, result] = useCreateInventoryItemMutation()

  const form = useForm<InventoryItemFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(inventoryItemFormSchema) as any,
    defaultValues: {
      name: '',
      category: undefined,
      sku: '',
      unit_size: '' as unknown as number,
      uom: '',
      reorder_point: '' as unknown as number,
      order_cost: '' as unknown as number,
      order_count: '' as unknown as number,
      is_active: true,
    },
  })

  function onSubmit(values: InventoryItemFormValues) {
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
