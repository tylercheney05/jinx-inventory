import type { ControllerRenderProps } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuantityFieldProps {
  field: ControllerRenderProps<any, 'quantity'>
  className?: string
  inputClassName?: string
}

const QuantityField = ({ field, className, inputClassName }: QuantityFieldProps) => (
  <FormItem className={className}>
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
          className={cn(
            "rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            inputClassName
          )}
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
)

export default QuantityField
