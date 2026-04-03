import { useEffect, type ReactNode } from 'react'
import type { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { LoadingIcon } from '@/components/Icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AddFormProps<T extends FieldValues> {
  title: string
  buttonText: string
  successMessage: string
  errorMessage: string
  form: UseFormReturn<T, any, any>
  result: { isSuccess: boolean; isError: boolean; isLoading: boolean }
  onSubmit: SubmitHandler<T>
  children: ReactNode
}

const AddForm = <T extends FieldValues>({
  title,
  buttonText,
  successMessage,
  errorMessage,
  form,
  result,
  onSubmit,
  children,
}: AddFormProps<T>) => {
  useEffect(() => {
    if (result.isSuccess) {
      toast.success(successMessage)
      form.reset()
    }
    if (result.isError) {
      toast.error(errorMessage)
    }
  }, [result.isSuccess, result.isError])

  return (
    <div className="px-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Form {...form}>
        <form className="space-y-4">
          {children}
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={result.isLoading}
          >
            {result.isLoading ? <LoadingIcon /> : buttonText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddForm
