import type { ControllerRenderProps } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

interface QuantityFieldProps {
  field: ControllerRenderProps<any, 'quantity'>
  className?: string
  inputClassName?: string
}

const STEPS = [-10, -5, 5, 10]

const QuantityField = ({ field, className, inputClassName }: QuantityFieldProps) => {
  const isMobile = useIsMobile()

  const adjust = (amount: number) => {
    field.onChange(Math.max(1, (field.value || 1) + amount))
  }

  return (
    <FormItem className={className}>
      <FormLabel>Quantity</FormLabel>
      <FormControl>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-r-none border-r-0 px-4 py-2 text-lg"
              onClick={() => adjust(-1)}
            >
              −
            </Button>
            <Input
              {...field}
              type="number"
              min={1}
              readOnly={isMobile}
              className={cn(
                "rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                inputClassName
              )}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-l-none border-l-0 px-4 py-2 text-lg"
              onClick={() => adjust(1)}
            >
              +
            </Button>
          </div>
          <div className="flex gap-4 justify-center">
            {STEPS.map((step) => (
              <Button
                key={step}
                type="button"
                variant="secondary"
                size="sm"
                className="text-xs w-12"
                onClick={() => adjust(step)}
              >
                {step > 0 ? `+${step}` : `−${Math.abs(step)}`}
              </Button>
            ))}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default QuantityField
