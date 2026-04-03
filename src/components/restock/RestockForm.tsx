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
import type { InventoryItem } from '@/types/inventoryItems'

const formSchema = z.object({
  quantity: z.coerce.number().int().positive({ message: 'Quantity must be a positive integer' }),
  purchase_date: z.string().min(1, { message: 'Purchase date is required' }),
  received_date: z.string().optional(),
  note: z.string().optional(),
})

interface RestockFormProps {
  item: InventoryItem
  onSuccess: () => void
}

const RestockForm = ({ item, onSuccess }: RestockFormProps) => {
  const [createInventoryLog, result] = useCreateInventoryLogMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      quantity: 1,
      purchase_date: new Date().toISOString().slice(0, 10),
      received_date: '',
      note: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInventoryLog({
      inventory_item: item.id,
      quantity: values.quantity,
      purchase_date: values.purchase_date,
      received_date: values.received_date || null,
      note: values.note ?? '',
    })
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Restock logged successfully!')
      form.reset({
        quantity: 1,
        purchase_date: new Date().toISOString().slice(0, 10),
        received_date: '',
        note: '',
      })
      onSuccess()
    }
    if (result.isError) {
      toast.error('Failed to log restock. Please try again.')
    }
  }, [result.isSuccess, result.isError])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-r-none border-r-0 px-4 py-2 text-lg"
                    onClick={() => field.onChange(Math.max(1, (field.value || 1) - 1))}
                  >
                    −
                  </Button>
                  <Input
                    {...field}
                    type="number"
                    min={1}
                    className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none border-l-0 px-4 py-2 text-lg"
                    onClick={() => field.onChange((field.value || 0) + 1)}
                  >
                    +
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchase_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="received_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Received Date <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          className="w-full bg-jinxBlue hover:bg-jinxBlue/90"
        >
          {result.isLoading ? <LoadingIcon size={18} className="text-white" /> : 'Log Restock'}
        </Button>
      </form>
    </Form>
  )
}

export default RestockForm
