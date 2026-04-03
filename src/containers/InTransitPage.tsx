import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'
import PageLoading from '@/components/PageLoading'
import { useGetInventoryLogsListQuery, useUpdateInventoryLogMutation } from '@/services/inventoryLogs'
import { useGetInventoryItemsListQuery } from '@/services/inventoryItems'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingIcon } from '@/components/Icons'
import QuantityField from '@/components/shared/QuantityField'
import type { InventoryLog } from '@/types/inventoryLogs'
import type { InventoryItem } from '@/types/inventoryItems'

const receiveSchema = z.object({
  quantity: z.coerce.number().int().positive({ message: 'Quantity must be a positive integer' }),
  received_date: z.string().min(1, { message: 'Received date is required' }),
})

interface InTransitCardProps {
  log: InventoryLog
  item: InventoryItem | undefined
}

const InTransitCard = ({ log, item }: InTransitCardProps) => {
  const [updateLog, result] = useUpdateInventoryLogMutation()

  const form = useForm<z.infer<typeof receiveSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(receiveSchema) as any,
    defaultValues: {
      quantity: log.quantity,
      received_date: new Date().toISOString().slice(0, 10),
    },
  })

  function onSubmit(values: z.infer<typeof receiveSchema>) {
    updateLog({
      id: log.id,
      quantity: values.quantity,
      received_date: values.received_date,
    })
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Item marked as received!')
    }
    if (result.isError) {
      toast.error('Failed to update. Please try again.')
    }
  }, [result.isSuccess, result.isError])

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <p className="font-semibold text-gray-800">
              {item ? item.name : `Item #${log.inventory_item}`}
            </p>
            {log.note && (
              <p className="text-sm text-gray-500 mt-0.5">{log.note}</p>
            )}
          </div>
          <p className="text-sm text-gray-600">Purchased: {log.purchase_date}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row sm:items-end gap-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <QuantityField field={field} className="sm:flex-shrink-0" inputClassName="flex-1 sm:w-16" />
              )}
            />

            <FormField
              control={form.control}
              name="received_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Received Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={result.isLoading}
              className="bg-jinxGreen hover:bg-jinxGreen/90 sm:px-6"
            >
              {result.isLoading ? <LoadingIcon size={18} className="text-white" /> : 'Receive'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const InTransitPage = () => {
  const { data: logs = [], isLoading, isError } = useGetInventoryLogsListQuery({ received_date__isnull: true }, { refetchOnMountOrArgChange: true })
  const { data: items = [] } = useGetInventoryItemsListQuery()

  const itemMap = new Map(items.map((item) => [item.id, item]))

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 my-6">In Transit</h1>

        {isLoading && <PageLoading />}

        {isError && (
          <p className="text-center text-red-500 mt-8">Failed to load in-transit items.</p>
        )}

        {!isLoading && !isError && logs.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No items currently in transit.</p>
        )}

        {!isLoading && !isError && logs.length > 0 && (
          <div className="grid gap-3">
            {logs.map((log) => (
              <InTransitCard key={log.id} log={log} item={itemMap.get(log.inventory_item)} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default InTransitPage
