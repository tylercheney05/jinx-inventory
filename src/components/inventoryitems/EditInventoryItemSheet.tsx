import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useUpdateInventoryItemMutation } from '@/services/inventoryItems'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { LoadingIcon } from '@/components/Icons'
import type { InventoryItem } from '@/types/inventoryItems'
import InventoryItemFormFields, {
  inventoryItemFormSchema,
  type InventoryItemFormValues,
} from './InventoryItemFormFields'

interface EditInventoryItemSheetProps {
  item: InventoryItem | null
  onOpenChange: (open: boolean) => void
}

const EditInventoryItemSheet = ({ item, onOpenChange }: EditInventoryItemSheetProps) => (
  <Sheet open={item !== null} onOpenChange={onOpenChange}>
    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
      {item && <EditInventoryItemFormBody item={item} onSuccess={() => onOpenChange(false)} />}
    </SheetContent>
  </Sheet>
)

interface EditInventoryItemFormBodyProps {
  item: InventoryItem
  onSuccess: () => void
}

const EditInventoryItemFormBody = ({ item, onSuccess }: EditInventoryItemFormBodyProps) => {
  const [updateInventoryItem, result] = useUpdateInventoryItemMutation()

  const form = useForm<InventoryItemFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(inventoryItemFormSchema) as any,
    defaultValues: {
      name: item.name,
      category: item.category.id,
      sku: item.sku,
      unit_size: item.unit_size,
      uom: item.uom,
      reorder_point: item.reorder_point,
      order_cost: Number(item.order_cost),
      order_count: item.order_count,
      is_active: item.is_active,
    },
  })

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Inventory item updated successfully!')
      onSuccess()
    }
    if (result.isError) {
      toast.error('Failed to update inventory item. Please try again.')
    }
  }, [result.isSuccess, result.isError])

  function onSubmit(values: InventoryItemFormValues) {
    updateInventoryItem({ id: item.id, ...values, order_cost: String(values.order_cost) })
  }

  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle>Edit Inventory Item</SheetTitle>
        <SheetDescription>Update the details for {item.name}.</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-4">
          <InventoryItemFormFields control={form.control} />
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={result.isLoading}
          >
            {result.isLoading ? <LoadingIcon /> : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditInventoryItemSheet
