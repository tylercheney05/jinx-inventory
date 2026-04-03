import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useCreateInventoryLogMutation } from '@/services/inventoryLogs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingIcon } from '@/components/Icons'
import QuantityField from '@/components/shared/QuantityField'
import type { InventoryItem } from '@/types/inventoryItems'

const formSchema = z.object({
  quantity: z.coerce.number().int().positive({ message: 'Quantity must be a positive integer' }),
  purchase_date: z.string().min(1, { message: 'Removal date is required' }),
  note: z.string().optional(),
})

interface RemovalFormProps {
  item: InventoryItem
  onSuccess: () => void
}

const RemovalForm = ({ item, onSuccess }: RemovalFormProps) => {
  const [createInventoryLog, result] = useCreateInventoryLogMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      quantity: 1,
      purchase_date: new Date().toISOString().slice(0, 10),
      note: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInventoryLog({
      inventory_item: item.id,
      quantity: -values.quantity,
      purchase_date: values.purchase_date,
      received_date: values.purchase_date,
      note: values.note ?? '',
    })
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Removal logged successfully!')
      form.reset({
        quantity: 1,
        purchase_date: new Date().toISOString().slice(0, 10),
        note: '',
      })
      onSuccess()
    }
    if (result.isError) {
      toast.error('Failed to log removal. Please try again.')
    }
  }, [result.isSuccess, result.isError])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => <QuantityField field={field} />}
        />

        <FormField
          control={form.control}
          name="purchase_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Removal Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="Add a note..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={result.isLoading}
          className="w-full bg-jinxRed hover:bg-jinxRed/90"
        >
          {result.isLoading ? <LoadingIcon size={18} className="text-white" /> : 'Log Removal'}
        </Button>
      </form>
    </Form>
  )
}

export default RemovalForm
